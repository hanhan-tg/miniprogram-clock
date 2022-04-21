import { getMyInfo, getUserById } from './userServices';

const updateAllData = require('../controller/updateAllData');
const getOpenId = require('../controller/getOpenId');
const getAllUser = require('../controller/getAllUser');
const getAllGroup = require('../controller/getAllGroup');
const { getId } = require('../utils/uuid');


export async function createGroup(params) {
  const { name, description } = params;
  if (!name) {
    return false;
  }
  const myOpenId = await getOpenId();
  const groups = await getAllGroup();
  let users = await getAllUser();
  const myInfo = await getMyInfo();

  const newGroup = {
    g_id: getId(),
    gl_id: myOpenId,
    gl_name: myInfo.name,
    is_disband: false,
    members: [myOpenId],
    tasks: [],
    create_time: Date.now(),
    name,
    description
  }
  // groups中添加newGroup
  groups.push(newGroup)

  // 往自己的groups中添加newGroup
  users = users.map((v, i) => {
    if (v.wx_id === myOpenId) {
      v.groups.push(newGroup.g_id)
    }
    return v;
  })

  // 更新数据
  await updateAllData({
    c_group: groups,
    c_user: users
  })
  return true;
}

export async function joinGroup(params) {
  const { group_id, user_id } = params;
  if (!group_id || !user_id) {
    return false;
  }

  let groups = await getAllGroup();
  let users = await getAllUser();
  let joinSuccessfully = true;

  // 把newGroup添加到自己的groups中
  users = users.map(v => {
    if (v.wx_id === user_id) {
      if (!v.groups.includes(group_id)) {
        v.groups.push(group_id)
      } else {
        joinSuccessfully = false;
      }
    }
    return v;
  })

  // 把自己添加到newGroup中
  groups = groups.map((v, i) => {
    if (v.g_id === group_id) {
      if (!v.members.includes(user_id)) {
        v.members.push(user_id)
      } else {
        joinSuccessfully = false;
      }
    }
    return v;
  })
  if (joinSuccessfully) {
    updateAllData({
      c_user: users,
      c_group: groups
    })
  }
  return joinSuccessfully
}

export async function disbandGroup(params) {
  const { group_id } = params;

  if (!group_id) {
    return false;
  }
  let groups = await getAllGroup();
  let success = false;

  groups = groups.map(v => {
    if (v.g_id === group_id) {
      v.is_disband = true;
      success = true;
    }
    return v;
  })
  await updateAllData({
    c_group: groups
  })
  return success;
}

export async function transferGroupLeader(params) {
  const { group_id, new_leader_id } = params
  let groups = await getAllGroup();
  let success = false;
  const user = await getUserById({
    user_id: new_leader_id
  })
  groups = groups.map(v => {
    if (v.g_id === group_id) {
      v.gl_id = new_leader_id;
      v.gl_name = user.name
      success = true;
    }
    return v;
  })
  await updateAllData({
    c_group: groups
  })
  return success;
}

export async function updateGroupInfo(params) {
  const { name, description, group_id } = params;
  let groups = await getAllGroup();
  let success = false;

  groups = groups.map(v => {
    if (v.g_id === group_id) {
      v.name = name;
      v.description = description
      success = true;
    }
    return v;
  })

  await updateAllData({
    c_group: groups
  })
  return success
}

export async function removeMembers(params) {
  const { members, group_id } = params
  if (!params || !members.length || !group_id) {
    return false;
  }
  let groups = await getAllGroup();
  let users = await getAllUser();
  let success = false;

  // 把groups中的members全给删了
  groups = groups.map(v => {
    if (v.g_id === group_id && !members.includes(v.gl_id)) {
      v.members = v.members.filter(user_id => !members.includes(user_id))
      success = true;
    }
    return v
  })

  // 再在members的groups中吧groupid给删了
  users = users.map(v => {
    if (v.groups.includes(group_id)) {
      v.groups = v.groups.filter(g_id => g_id !== group_id);
      success = true;
    }
    return v
  })

  await updateAllData({
    c_user: users,
    c_group: groups
  })
  return success
}

export async function getMyGroupAsLeader() {
  const myOpenId = await getOpenId();
  let groups = await getAllGroup();

  return groups.filter(v => v.gl_id === myOpenId);
}
export async function getMyGroupAsMember() {
  const myOpenId = await getOpenId();
  let groups = await getAllGroup();
  let users = await getAllUser();

  const myGroups = users.find(v => v.wx_id === myOpenId).groups
  const resGroups = groups.filter(v => myGroups.includes(v.g_id))
  return await Promise.all(resGroups.map(async v => {
    v.members = await Promise.all(v.members.map(async u_id => {
      return (await getUserById({
        user_id: u_id
      })).name
    }))
    return v;
  }))
}

export async function searchGroupByName(params) {
  const { group_name } = params
  const groups = await getAllGroup();

  return groups.filter(v => v.name.includes(group_name));
}
export async function searchGroupById(params) {
  const { group_id } = params;
  const groups = await getAllGroup();

  return groups.find(v => v.g_id === group_id);
}
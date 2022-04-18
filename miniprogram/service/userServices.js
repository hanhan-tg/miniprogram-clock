import { getAllGroup } from '../controller/index';

const updateAllData = require('../controller/updateAllData');
const getOpenId = require('../controller/getOpenId');
const getAllUser = require('../controller/getAllUser');
/**
 * 
 * @param {String} stu_id 
 * @param {String} name 
 * @param {String} classname 
 */
export async function createUser(params) {
  const { stu_id, name, classname, user_id } = params;
  const myOpenId = await getOpenId();
  if (await isRegister()) {
    console.log('is registered');
    return false;
  }
  const users = await getAllUser();
  users.push({
    wx_id: myOpenId,
    groups: [],
    name,
    stu_id,
    classname,
    create_time: Date.now()
  })
  await updateAllData({
    c_user: users
  })
  return true
}

export async function resetInfo(params) {
  const { name, stu_id, classname } = params;
  const myOpenId = await getOpenId();
  let users = await getAllUser();
  let groups = await getAllGroup();
  let success = false;

  users = users.map(u => {
    if (u.wx_id === myOpenId) {
      u.groups.forEach(group_id => {
        const group = groups.find(g => g.g_id === group_id);
        group.gl_name = name;
      })
      success = true;
      return {
        ...u,
        name,
        stu_id,
        classname,
      }
    }
    return u;
  })
  await updateAllData({
    c_user: users,
    c_group: groups
  })
  return success;
}

export async function isRegister() {
  if (await getMyInfo()) {
    return true
  }
  return false
}

export async function getMyInfo() {
  const OPENID = await getOpenId()
  const users = await getAllUser();
  const myInfo = users.find((v, i) => v.wx_id === OPENID);
  if (myInfo) {
    return {
      name: myInfo.name,
      stu_id: myInfo.stu_id,
      classname: myInfo.classname
    }
  }
  return false
}

export async function getUserById(params) {
  const { user_id } = params;
  const users = await getAllUser();

  return users.find(u => u.wx_id === user_id)
}

import { getMyGroupAsMember } from './groupServices';

const { getAllGroup, getOpenId, getAllUser, getAllTask, updateAllData } = require('../controller/index');
const { getId } = require('../utils/uuid');

export async function createTask(params) {
  const { group_id, name, description, start_time, end_time } = params
  let groups = await getAllGroup() || [];
  let tasks = await getAllTask() || [];
  let success = false;

  const newTask = {
    t_id: getId(),
    g_id: group_id,
    create_time: Date.now(),
    completeUsers: [],
    name,
    description,
    start_time,
    end_time
  }

  groups = groups.map(v => {
    if (v.g_id === group_id) {
      v.tasks.push(newTask.t_id);
      success = true;
    }
    return v;
  })
  tasks.push(newTask);

  await updateAllData({
    c_group: groups,
    c_task: tasks
  })
  return success
}

export async function completeTask(params) {
  const { task_id, user_id, address, complete_time, commonts } = params
  let tasks = await getAllTask();
  let success = false;

  tasks = tasks.map(v => {
    if (v.t_id === task_id) {
      v.completeUsers.push({
        wx_id: user_id,
        complete: true,
        address,
        complete_time,
        commonts
      })
      return v;
    }
  })

  await updateAllData({
    c_task: tasks
  })
  return success
}

export async function deleteTask(params) {
  const { task_id, group_id } = params
  let tasks = await getAllTask();
  let groups = await getAllGroup();

  tasks = tasks.filter(v => v.t_id !== task_id);
  groups = groups.map(v => {
    if (v.g_id === group_id) {
      v.tasks = v.tasks.filter(t_id => t_id !== task_id)
    }
    return v;
  })

  if (tasks) {
    await updateAllData({
      c_task: tasks,
      c_group: groups
    })
    return true;
  }
  return false;
}

export async function updateTaskInfo(params) {
  const { task_id, name, description, start_time, end_time } = params
  let tasks = await getAllTask();
  let success = false;

  tasks = tasks.map(v => {
    if (v.t_id === task_id) {
      v.name = name;
      v.description = description;
      v.start_time = start_time;
      v.end_time = end_time
      success = true;
    }
    return v;
  })
  await updateAllData({
    c_task: tasks
  })
  return success;
}

export async function getCompleteTask() {
  const myOpenId = await getOpenId();
  const users = await getAllUser();
  // const groups = await getAllGroup();
  const tasks = await getAllTask();

  let myTotalTasks = 0;

  const res = [];
  // users.forEach(u => {
  //   if (u.wx_id === myOpenId) {
  //     // 拿到所有参与队伍的id
  //     u.groups.forEach(group_id => {
  //       // 找到对应的group
  //       const group = groups?.find(g => g.g_id === group_id);
  //       tasks.forEach(t => {
  //         // 找到group中存在的task并存入res
  //         if (group?.tasks.includes(t.t_id)) {
  //           res.push(t);
  //         }
  //       })
  //     })
  //   }
  // })

  // 通过user.groups中的每个group中的每个task中的completeUser中是否包含user
  users.forEach(u => {
    if(u.wx_id === myOpenId) {
      u.groups.forEach(group_id => {
        tasks.forEach(t => {
          if(t.g_id === group_id) {
            myTotalTasks++;
            const cu = t.completeUsers.find(c => c.wx_id === myOpenId)
            if(cu) {
              res.push({
                name: t.name,
                id: t.t_id,
                description: t.description,
                complete_time: cu.complete_time,
                commonts: cu.commonts
              });
            }
          }
        })
      })
    }
  })
  console.log('services', res, myTotalTasks);
  return {
    total: myTotalTasks,
    completeTasks: res,
  };
}

export async function getOneTask(params) {
  const { task_id } = params;
  const tasks = await getAllTask();
  return tasks.find(v => v.t_id === task_id)
}

export async function getTasksInGroup(params) {
  const { group_id } = params;
  const groups = await getAllGroup();
  const allTasks = await getAllTask();
  const tasks = groups.find(v => v.g_id === group_id).tasks;
  const res = [];

  allTasks.forEach((v) => {
    if (tasks.includes(v.t_id)) {
      res.push(v);
    }
  })
  return res;
}

export async function getDailyTasks () {
  const tasks = await getAllTask();
  const myOpenId = await getOpenId();
  let myGroups = await getMyGroupAsMember();
  myGroups = myGroups.map(g => {
    const taskList = [];
    tasks.forEach(t => {
      if(g.tasks.includes(t.t_id)) {
        // 判断任务是否今日可做
        const startTime = new Date(t.start_time).getTime();
        const endTime = new Date(t.end_time).getTime();
        const nowTime = new Date().getTime()
        if(startTime < nowTime && nowTime < endTime) {
          t.complete = t.completeUsers.find(u => u.wx_id === myOpenId)?.complete || false
          taskList.push(t)
        } 
      }
    })
    if(taskList.length) {
      return {
        groupName: g.name,
        taskList,
      }
    }
    return null;
  })
  return myGroups.filter(g => g !== null);
}
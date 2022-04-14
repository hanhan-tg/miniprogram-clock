// index.js
const app = getApp()
const db = app.getDB();
const { getAllGroup, getAllUser, getOpenId, updateAllData } = require('../../controller/index');
const { getMyInfo, addUser } = require('../../service/index');
const { createGroup, joinGroup, createUser, disbandGroup, transferGroupLeader, updateGroupInfo, removeMembers, getMyGroupAsLeader, getMyGroupAsMember } = require('../../service/index');
Page({
  data: {
    showText: 'click mezzz'
  },
  onLoad() {
    const todos = db.collection('todos');
  },
  async onClick() {
    // const groups = await getAllGroup();
    // const users = await getAllUser();
    const openId = await getOpenId();

    // createUser({
    //   user_id: '800800800',
    //   stu_id: '008008008',
    //   name: 'noname',
    //   classname: 'cns'
    // })
    // console.log('click', await joinGroup({
    //   group_id: '4d1098e5-e1aa-461b-8d6a-4551e6f35a5a',
    //   user_id: openId
    // }));
    // disbandGroup({
    //   group_id: 'e5ff92bf-2057-4a20-a8d5-cdaf3c6e67c6'
    // })
    // transferGroupLeader({
    //   group_id: '4d1098e5-e1aa-461b-8d6a-4551e6f35a5a',
    //   new_leader_id: '800800800'
    // })
    // updateGroupInfo({
    //   group_id: '4d1098e5-e1aa-461b-8d6a-4551e6f35a5a',
    //   name: '改了名的测试组',
    //   description: '改了的描述'
    // })
    // removeMembers({
    //   members: '800800800',
    //   group_id: '4d1098e5-e1aa-461b-8d6a-4551e6f35a5a'
    // })
    console.log('click',await getMyGroupAsLeader());
    console.log('click',await getMyGroupAsMember());

    // console.log('click', await updateAllData());
    // console.log('click', getMyInfo());
    // console.log('click', addUser('12313213', 'hhhhhhhhhhhhhhhhhhhhhhh', 'rg1231'));
    // console.log('click', createGroup('开大船'));
    // console.log('click', createTask({
    //   group_id: '0a9ead5f-ea4a-470b-80b8-436330e514f9',
    //   name: 'dance',
    //   description: 'nnnnnnnnnnnnn',
    //   start_time: Date.now(),
    //   end_time: Date.now(),
    // }));
    // console.log('click', completeTask({
    //   task_id : '85a6ea91-abfc-4305-84ee-1a7c3341fd4c',
    //   user_id: openId,
    //   address: 'aaaaaaaaa',
    //   complete_time: Date.now(),
    //   commonts: '这是一条评论'
    // }));
    // updateTaskInfo({
    //   task_id: '85a6ea91-abfc-4305-84ee-1a7c3341fd4c',
    //   name: '跳绳',
    //   description: '跳大绳',
    //   start_time: 'zzzz',
    //   end_time: 'end_time'
    // })
    // console.log('click', await getTasksInGroup({
    //   group_id: '28b694f4-1857-4df6-9faa-96151d3f26b3'
    // }))
    // console.log(await deleteTask({
    //   task_id: "92a27a57-c0b3-4c87-82c3-d3a75a8f7c43",
    //   group_id: '0a9ead5f-ea4a-470b-80b8-436330e514f9'
    // }));

    // group test
    // console.log('click', await createGroup({
    //   name: '测试组',
    //   gl_id: openId
    // }));
    

  },

});



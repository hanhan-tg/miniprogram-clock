interface User {
  wx_id: String,
  stu_id: String,
  name: String,
  classname: String,
  groups: Array<String>, // 存放groupId
  create_time: Number
}
interface Group {
  g_id: String,
  gl_id: String, // group leader wx_id
  name: String,
  description: String,
  is_disband: Boolean,
  members: Array<String>, // 存放wx_id
  tasks: Array<Task>, // task_id
  create_time: Number
}
interface Task {
  t_id: String,
  g_id: String,
  name: String,
  description: String,
  create_time: Number,
  start_time: Number,
  end_time: Number,
  completeUsers: Array<CompleteUser>,
}
interface CompleteUser {
  wx_id: String,
  address: String,
  complete: Boolean,
  complete_time: Date,
  commonts: String,
}

// const user: User = {
//   wx_id: 'wx_id',
//   stu_id: 'stu_id',
//   name: 'hanhan',
//   classname: 'rg1888',
//   group: [
//     {
//       g_id: 'gid',
//       gl_id: 'wx_id',
//       name: 'groupname',
//       is_disband: false,
//       task: [
//         {
//           id: 'task_id',
//           name: 'task1',
//           target: 'ttarget',
//           start_time: new Date(),
//           end_time: new Date(),
//           address: 'nc',
//           complete: false,
//           complete_time: new Date(),
//           commonts: 'commonts'
//         }
//       ]
//     }
//   ]
// }
interface User {
  wx_id: String,
  stu_id: String,
  name: String,
  classname: String,
  group: Array<Group>,
}
const user: User = {
  wx_id: 'wx_id',
  stu_id: 'stu_id',
  name: 'hanhan',
  classname: 'rg1888',
  group: [
    {
      g_id: 'gid',
      gl_id: 'wx_id',
      name: 'groupname',
      is_disband: false,
      task: [
        {
          id: 'task_id',
          name: 'task1',
          target: 'ttarget',
          start_time: new Date(),
          end_time: new Date(),
          address: 'nc',
          complete: false,
          complete_time: new Date(),
          commonts: 'commonts'
        }
      ]
    }
  ]
}
interface Group {
  g_id: String,
  gl_id: String, // group leader
  name: String,
  is_disband: Boolean,
  task: Array<Task>,
}
interface Task {
  id: String,
  name: String,
  target: String,
  start_time: Date,
  end_time: Date,
  address: String,
  complete: Boolean,
  complete_time: Date,
  commonts: String,
}

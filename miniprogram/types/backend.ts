
// user
interface CreateUser {
  user_id: String;
  stu_id: String;
  name: String,
  classname: String,
}
interface isRegistered {
  
}
interface getMyInfo {

}

// group
interface CreateGroup {
  name: String,
  description: String;
  gl_id?: String,
}
interface JoinGroup {
  group_id: String,
  user_id: String
}
interface DisbandGroup {
  group_id: String,
}
interface TransferGroupLeader {
  group_id: String,
  new_leader_id: String,
}
interface UpdateGroupInfo {
  name: String,
  description:String;
  group_id: String;
}
interface RemoveMembers {
  members: Array<String>;
  group_id: String;
}
interface GetMyGroupAsLeader {

}
interface GetMyGroupAsMember {

}

// task
interface CreateTask {
  group_id: String,
  name: String,
  description: String,
  start_time: Number,
  end_time: Number,
}
interface CompleteTask {
  task_id: String,
  user_id: String,
  address: String,
  complete_time: Number,
  commonts: String,
}
interface DeleteTask {
  task_id: String,
  group_id: String,
}
interface UpdateTaskInfo {
  task_id: String,
  name: String,
  description: String,
  start_time: String,
  end_time: String,
}
interface GetCompleteTask{

}
interface GetOneTask {
  task_id: String
}
interface GetTasksInGroup {
  group_id: String
}

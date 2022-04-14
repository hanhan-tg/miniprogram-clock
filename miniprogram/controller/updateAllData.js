
module.exports = (data) => wx.cloud.callFunction({
  name: 'updateAllData',
  data: {
    newUserCollection: data.c_user,
    newGroupCollection: data.c_group,
    newTaskCollection: data.c_task
  }
})
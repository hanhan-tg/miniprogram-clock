import { createTask, getOneTask } from "../../service/index";

// index.js
const app = getApp()

Page({
  data: {
    headerText: '开大船',
    contentList: [{
      id: '111',
      content: '跳绳',
      select: false
    },{
      id: '222',
      content: '开大船',
      select: false
    },{
      id: '333',
      content: '跳绳',
      select: true
    }]
  },
  onLoad() {
    console.log('load');
    // wx.navigateTo({
    //   url: '/pages/createdGroup/index',
    // })
  },
  async onClick(e) {
    const id = e.detail.id;
    const task = await getOneTask({
      task_id: id,
    })
    // wx.navigateTo({
    //   url: `/pages/detail/index?name=${task.name}&target=${task.description}&startTime=${task.start_time}&endTime=${task.end_time}`,
    // })
  },
  onAdd() {
    console.log('click add');
    
  }
});



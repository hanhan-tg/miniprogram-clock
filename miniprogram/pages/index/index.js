import { getOpenId } from "../../controller/index";
import { createTask, getOneTask, isRegister } from "../../service/index";

// index.js

Page({
  data: {
    headerText: '开大船',
    contentList: [{
      id: '111',
      content: '跳绳',
      select: false
    }, {
      id: '222',
      content: '开大船',
      select: false
    }, {
      id: '333',
      content: '跳绳',
      select: true
    }],
    visible: false,
  },
  async onLoad() {
    console.log('load');
    if (!await isRegister()) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
    wx.navigateTo({
      url: '/pages/groups/index',
    })
  },
  async onClickDetail(e) {
    const openId = await getOpenId();
    const id = e.detail.id;
    const task = await getOneTask({
      task_id: id,
    })
    const complete = task.completeUsers.find(u => u.wx_id === openId).complete;
    // wx.navigateTo({
    //   url: `/pages/detail/index?name=${task.name}&target=${task.description}&startTime=${task.start_time}&endTime=${task.end_time}&complete=${complete}`,
    // })
  },
  onAdd() {
    console.log('click add');
    this.setData({
      visible: true
    })
  },
  onCreateGroup() {
    this.setData({
      visible: false
    })
  },
  onJoinGroup() {
    this.setData({
      visible: false
    })
  },
  onAddClock() {
    this.setData({
      visible: false
    })
  }
});



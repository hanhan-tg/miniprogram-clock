import { getOpenId } from "../../controller/index";
import { createGroup, createTask, getMyGroupAsMember, getOneTask, getTasksInGroup, isRegister, getDailyTasks } from "../../service/index";
import Dialog from '../../miniprogram_npm/tdesign-miniprogram/dialog/index';
import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index';

const timestamp2Date = require('../../utils/timestamp2Date');

// index.js

Page({
  data: {
    dailyGroups: [],
    rootPopupVisible: false,
    newGroupName: '',
    newGroupDescription: '',
    selectedGroupName: '请选择队伍',
    hasJoinedGroup: false,
    todayTime: ''
  },
  async onLoad() {
    
    console.log('home load');
    // wx.navigateTo({
    //   url: '/pages/dataAnalysis/index',
    // })
    if (!await isRegister()) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
    
    const now = new Date();
    this.setData({
      todayTime: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    })

    const res = await getDailyTasks();
    const groups = await getMyGroupAsMember()
    this.setData({
      dailyGroups: res,
      hasJoinedGroup: groups?.length > 0,
    })

  },
  async onClickDetail(e) {
    const { id, complete } = e.detail;
    const task = await getOneTask({
      task_id: id,
    })
    // console.log('tttt', task, complete);
    wx.navigateTo({
      url: `/pages/detail/index?name=${task.name}&target=${task.description}&startTime=${task.start_time}&endTime=${task.end_time}&complete=${complete}&task_id=${id}`,
    })
  },
  onAdd() {
    console.log('click add');
    this.setData({
      rootPopupVisible: true
    })
  },
  onVisibleChange({ detail }) {
    const { visible } = detail;
    this.setData({
      rootPopupVisible: visible
    })
  },
  async onCreateGroup() {
    this.setData({
      rootPopupVisible: false,
    })
    Dialog.confirm({
      title: '创建队伍',
      confirmBtn: '创建',
      cancelBtn: '取消',
    }).then(async () => {
      if (!this.data.newGroupDescription && !this.data.newGroupName) {
        Toast({
          context: this,
          selector: '#t-toast-create-group',
          message: '请输入完整信息',
        });
        return;
      }
      const suc = await createGroup({
        name: this.data.newGroupName,
        description: this.data.newGroupDescription
      })
      Toast({
        context: this,
        selector: '#t-toast-create-group',
        message: suc ? '创建成功' : '创建失败，请重试',
      });
    })
  },
  onJoinGroup() {
    this.setData({
      rootPopupVisible: false
    })
    wx.navigateTo({
      url: '/pages/searchGroup/index',
    })
  },
  onAddClock() {
    this.setData({
      rootPopupVisible: false
    })
    wx.navigateTo({
      url: '/pages/createTask/index',
    })
  },
  async onShow() {
    // 重新请求
    console.log('show');
    const res = await getDailyTasks();
    this.setData({
      dailyGroups: res,
    })
  }
});



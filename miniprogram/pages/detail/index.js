// pages/detail/index.js
import { getOpenId } from '../../controller/index';
import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index'
import { completeTask } from '../../service/index';
Page({
  data: {
    task_id: '',
    commonts: '',
    name: '无',
    target: '无',
    startTime: '无',
    endTime: '无',
    // address: '无'
    complete: false,
  },

  async onClickClock() {
    if(this.data.complete) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请勿重复打卡',
        theme: 'success',
        duration: 2000
      })
      return;
    }
    const openId = await getOpenId();
    const now = new Date();
    const res = await completeTask({
      task_id: this.data.task_id,
      user_id: openId,
      complete_time: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours() > 10 ? now.getHours() : '0' + now.getHours()}:${now.getMinutes() > 10 ? now.getMinutes() : '0' + now.getMinutes()}`,
      commonts: this.data.commonts,
    })
    Toast({
      context: this,
      selector: '#t-toast',
      message: res ? '打卡成功' : '打卡失败',
      theme: res ? 'success' : 'fail',
      duration: 2000
    })
    if(res) {
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }
  },
  onLoad: function (options) {
    const pages = getCurrentPages();
    const { name, target, startTime, endTime, complete, task_id } = pages[pages.length - 1].options;
    const startT = new Date(startTime);
    const endT = new Date(endTime);
    this.setData({
      task_id,
      name,
      target,
      complete: complete === 'true',
      startTime: `${startT.getFullYear()}-${startT.getMonth() + 1}-${startT.getDate()} ${'  '} ${startT.getHours() > 10 ? startT.getHours() : '0' + startT.getHours()}:${startT.getMinutes() > 10 ? startT.getMinutes() : '0' + startT.getMinutes()}`,
      endTime: `${endT.getFullYear()}-${endT.getMonth() + 1}-${endT.getDate()} ${'  '} ${endT.getHours() > 10 ? endT.getHours() : '0' + endT.getHours()}:${endT.getMinutes() > 10 ? endT.getMinutes() : '0' + endT.getMinutes()}`,
      // address
    })
  },
})
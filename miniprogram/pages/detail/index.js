// pages/detail/index.js
import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index'
Page({
  data: {
    commonts: '',
    name: '无',
    target: '无',
    startTime: '无',
    endTime: '无',
    // address: '无'
    complete: false,
  },

  onClickClock() {
    if(this.data.complete) {
      return;
    }
    console.log('打卡');
    // TODO: 调接口
    Toast({
      context: this,
      selector: '#t-toast',
      message: '打卡成功',
      theme: 'success',
      duration: 2000
    })
  },
  onLoad: function (options) {
    const pages = getCurrentPages();
    const { name, target, startTime, endTime, complete } = pages[pages.length - 1].options;
    const startT = new Date(+startTime);
    const endT = new Date(+endTime);
    this.setData({
      name,
      target,
      complete,
      startTime: `${startT.getFullYear()}-${startT.getMonth()}-${startT.getDate()} ${'  '} ${startT.getHours() > 10 ? startT.getHours() : '0' + startT.getHours()} : ${startT.getMinutes() > 10 ? startT.getMinutes() : '0' + startT.getMinutes()}`,
      endTime: `${endT.getFullYear()}-${endT.getMonth()}-${endT.getDate()} ${'  '} ${endT.getHours() > 10 ? endT.getHours() : '0' + endT.getHours()} : ${endT.getMinutes() > 10 ? endT.getMinutes() : '0' + endT.getMinutes()}`,
      // address
    })
  },
})
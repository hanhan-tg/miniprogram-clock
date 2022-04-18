const { getMyInfo } = require("../../service/index")
// pages/my/index.js
Page({

  data: {
    info: {},
    popupVisible: '',
  },

  onClickGroupCreated() {
    wx.navigateTo({
      url: '/pages/groups/index',
    })
  },
  onClickGroupJoined() {

  },
  onClickClock() {
    wx.navigateTo({
      url: '/pages/completeTasks/index',
    })
  },
  onClickJoin() {
    wx.navigateTo({
      url: '/pages/searchGroup/index',
    })
  },
  onClickSetting() {
    wx.navigateTo({
      url: '/pages/settings/index',
    })
  },
  onClickAttach() {
    this.setData({
      popupVisible: true
    })
  },
  onPopupVisibleChange({ detail }) {
    const { visible } = detail;
    this.setData({
      popupVisible: visible
    })
  },
  onImageError() {
    console.log('image error');
  },
  onImageLoad() {
    console.log('image load');

  },
  onLoad: async function (options) {
    const info = await getMyInfo();
    this.setData({
      info,
    })
  },
})
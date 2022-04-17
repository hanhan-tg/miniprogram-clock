const { getMyInfo } = require("../../service/index")

// pages/my/index.js
Page({

  data: {
    info: {}
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
  onClickJoin(){
    wx.navigateTo({
      url: '/pages/searchGroup/index',
    })
  },
  onClickSetting() {
    wx.navigateTo({
      url: '/pages/settings/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const info = await getMyInfo();
    this.setData({
      info,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
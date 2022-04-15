// pages/createdGroup/index.js
Page({

  data: {
    groupList: [
      {
        groupName: '开大船',
        id: 'z',
        leader: '何嘉伟',
        memberList: ['何嘉伟','何嘉伟','何嘉伟','何嘉伟']
      },
      {
        groupName: '开大船',
        id: 'z2',
        leader: '何嘉伟',
        memberList: ['何嘉伟','何嘉伟','何嘉伟','何嘉伟']
      }
    ],
    visible: false
  },
  onClickSetting() {
    this.setData({
      visible: true
    })
  },
  onDataAnalysis() {
    this.setData({
      visible: false
    })
  },
  onGroupTransfer() {
    this.setData({
      visible: false
    })
  },
  onGroupDisband() {
    this.setData({
      visible: false
    })
  },
  onLoad: function (options) {

  },

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
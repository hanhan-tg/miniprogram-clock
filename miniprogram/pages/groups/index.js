// pages/createdGroup/index.js
import Dialog from "../../miniprogram_npm/tdesign-miniprogram/dialog/index"

const { getOpenId } = require("../../controller/index")
const { getMyGroupAsLeader, disbandGroup } = require("../../service/index")

Page({
  data: {
    groupList: [],
    openId: '',
    visible: false,
    activeGroupId: '',
  },
  onClickCopy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.groupId,
    })

  },
  onClickSetting(e) {
    this.setData({
      visible: true,
      activeGroupId: e.currentTarget.dataset.groupId
    })

  },
  onDataAnalysis() {
    this.setData({
      visible: false
    })
    wx.navigateTo({
      url: '/pages/dataAnalysis/index',
    })
  },
  onGroupTransfer() {
    this.setData({
      visible: false
    })
  },
  async onGroupDisband() {
    Dialog.confirm({
      title: '确认要解散吗？',
      confirmBtn: '确认',
      cancelBtn: '取消',
    }).then(async () => {
      this.setData({
        visible: false
      })
      const res = await disbandGroup({
        group_id: this.data.activeGroupId
      })
      if (!res) {
        return;
      }
      const newList = this.data.groupList.map(g => {
        if (g.g_id === this.data.activeGroupId) {
          return {
            ...g,
            is_disband: true
          }
        }
        return g
      })
      this.setData({
        groupList: newList,
      })
    })


  },
  onLoad: async function (options) {
    await this.loadData();
  },
  async loadData() {
    const groups = await getMyGroupAsLeader()
    const openId = await getOpenId();
    this.setData({
      groupList: groups.sort((a,b) => b.create_time - a.create_time),
      openId
    })
  }
})
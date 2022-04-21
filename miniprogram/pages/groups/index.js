// pages/createdGroup/index.js
import Dialog from "../../miniprogram_npm/tdesign-miniprogram/dialog/index"
import Toast from "../../miniprogram_npm/tdesign-miniprogram/toast/index"

const { getOpenId } = require("../../controller/index")
const { disbandGroup, getMyGroupAsMember, searchGroupById, getUserById, transferGroupLeader, removeMembers, updateGroupInfo } = require("../../service/index")

Page({
  data: {
    groupList: [],
    openId: '',
    visible: false,
    activeGroupId: '',
    isLoading: true,
    isTransferingOrRemove: false,
    activeGroupMemberId: '',
    renderItems: [],
    isUpdating: false,
    updatingGroupName: '',
    updatingGroupDescription: '',
  },
  onVisibleChange({ detail }) {
    const { visible } = detail;
    this.setData({
      visible
    })
  },
  onClickCopy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.groupId,
    })

  },
  onClickSetting(e) {
    const { groupId } = e.currentTarget.dataset
    this.setData({
      visible: true,
      activeGroupId: groupId
    })
  },
  async onClickExit(e) {
    this.setData({
      activeGroupId: e.currentTarget.dataset.groupId,
      activeGroupMemberId: this.data.openId
    })

    Dialog.confirm({
      title: '是否退出',
      confirmBtn: '确认',
      cancelBtn: '取消',
    }).then(async () => {
      await removeMembers({
        members: [this.data.activeGroupMemberId],
        group_id: this.data.activeGroupId
      })
      this.setData({
        groupList: [],
        isLoading: true,
      })
      await this.onLoad();
      setTimeout(() => {
        this.setData({
          isLoading: false,
        })
      }, 1000);
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
  async getRenderItems({ isRemoveMembers } = {}) {
    const group = await searchGroupById({
      group_id: this.data.activeGroupId
    })
    const renderItems = await Promise.all(group.members.map(
      async wx_id => {
        if (isRemoveMembers && wx_id === group.gl_id) return;

        const user = await getUserById({
          user_id: wx_id
        })
        return {
          name: user.name,
          id: user.wx_id
        }
      }))
    return renderItems.filter(i => i)
  },
  async onGroupTransfer() {
    const renderItems = await this.getRenderItems();

    this.setData({
      visible: false,
      isTransferingOrRemove: true,
      renderItems,
    })
    Dialog.confirm({
      title: '队伍转让',
      confirmBtn: '确认',
      cancelBtn: '取消',
    }).then(async () => {
      const group = await searchGroupById({
        group_id: this.data.activeGroupId
      })
      if (group.gl_id === this.data.activeGroupMemberId) {
        return;
      }
      await transferGroupLeader({
        group_id: this.data.activeGroupId,
        new_leader_id: this.data.activeGroupMemberId
      })
      this.setData({
        groupList: [],
        isLoading: true,
      })
      await this.onLoad();
      setTimeout(() => {
        this.setData({
          isTransferingOrRemove: false,
          isLoading: false,
        })
      }, 1000);
    }).catch(() => {
      setTimeout(() => {
        this.setData({
          isTransferingOrRemove: false,
        })
      }, 1000);
    })
  },
  async onUpdateGroupInfo() {
    const group = await searchGroupById({
      group_id: this.data.activeGroupId
    });
    this.setData({
      isUpdating: true,
      visible: false,
      updatingGroupName: group.name,
      updatingGroupDescription: group.description
    })
    Dialog.confirm({
      title: '修改队伍信息',
      confirmBtn: '创建',
      cancelBtn: '取消',
    }).then(async () => {
      if (!this.data.updatingGroupName && !this.data.updatingGroupDescription) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '请输入完整信息',
        });
        return;
      }
      const suc = await updateGroupInfo({
        name: this.data.updatingGroupName,
        description: this.data.updatingGroupDescription,
        group_id: this.data.activeGroupId
      })
      Toast({
        context: this,
        selector: '#t-toast',
        message: suc ? '修改成功' : '修改失败，请重试',
      });
      this.setData({
        isUpdating: false,
      })
      await this.onLoad();
    })
  },
  async onGroupDisband() {
    this.setData({
      visible: false
    })
    Dialog.confirm({
      title: '确认要解散吗？',
      confirmBtn: '确认',
      cancelBtn: '取消',
    }).then(async () => {
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

  async onRemoveMembers() {
    const renderItems = await this.getRenderItems({
      isRemoveMembers: true
    })
    if (renderItems.length === 0) {
      this.setData({
        visible: false
      })
      Toast({
        context: this,
        selector: '#t-toast',
        message: '暂无其他队员',
      });
      return;
    }
    this.setData({
      renderItems,
      isTransferingOrRemove: true,
      visible: false,
      activeGroupMemberId: renderItems[0].id
    })
    Dialog.confirm({
      title: '移除队员',
      confirmBtn: '确认',
      cancelBtn: '取消',
    }).then(async () => {
      const group = await searchGroupById({
        group_id: this.data.activeGroupId
      })
      if (group.gl_id === this.data.activeGroupMemberId) {
        return;
      }
      await removeMembers({
        members: [this.data.activeGroupMemberId],
        group_id: this.data.activeGroupId
      })
      this.setData({
        groupList: [],
        isLoading: true,
      })
      await this.onLoad();
      setTimeout(() => {
        this.setData({
          isTransferingOrRemove: false,
          isLoading: false,
        })
      }, 1000);
    }).catch(() => {
      setTimeout(() => {
        this.setData({
          isTransferingOrRemove: false,
        })
      }, 1000);
    })
  },
  onChange(e) {
    this.setData({
      activeGroupMemberId: e.detail.value
    })
  },
  onLoad: async function (options) {
    await this.loadData();
  },
  async loadData() {
    const groups = await getMyGroupAsMember()
    const openId = await getOpenId();
    this.setData({
      groupList: groups.sort((a, b) => b.create_time - a.create_time),
      openId,
      isLoading: false
    })
  }
})
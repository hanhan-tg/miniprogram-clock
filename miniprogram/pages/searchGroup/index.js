import { getOpenId } from "../../controller/index";
import { joinGroup, searchGroupById, searchGroupByName } from "../../service/index"
import Toast from "../../miniprogram_npm/tdesign-miniprogram/toast/index";
import Dialog from "../../miniprogram_npm/tdesign-miniprogram/dialog/index"
// pages/searchGroup/index.js
Page({
  data: {
    searchValue: '',
    groupList: [],
    dialogVisible: false
  },
  async onSubmit() {
    if (!this.data.searchValue) {
      return;
    }
    const group = await searchGroupById({
      group_id: this.data.searchValue
    });
    if (group) {
      this.setData({
        groupList: [group]
      })
      return;
    }
    const groups = await searchGroupByName({
      group_name: this.data.searchValue
    });
    if (groups?.length) {
      this.setData({
        groupList: groups
      })
    }
  },
  onChange() {
    if (this.data.groupList.length > 0) {
      this.setData({
        groupList: []
      })
    }
  },
  onJoin(e) {
    Dialog.confirm({
      title: '是否确认加入',
      confirmBtn: '加入',
      cancelBtn: '取消',
    }).then(async () => {
      const res = await joinGroup({
        group_id: e.currentTarget.dataset.groupId,
        user_id: await getOpenId()
      })
      Toast({
        context: this,
        selector: '#t-toast-join',
        message: res ? '加入成功' : '已在队伍中'
      })
    })
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },

})
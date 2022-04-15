import { getOpenId } from "../../controller/index";
import { createUser } from "../../service/index";

// pages/login/index.js
Page({

  data: {
    name: '',
    sid: '',
    classname: ''
  },
  async onClickEnter() {
    console.log('first time enter');
    const openId = await getOpenId();
    const res = await createUser({
      user_id: openId,
      stu_id: this.data.sid,
      name: this.data.name,
      classname: this.data.classname
    })
    if (res) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  onLoad: function (options) {

  },

  onReady: function () {

  },
})

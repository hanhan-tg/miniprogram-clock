import { getOpenId } from "../../controller/index";
import { createUser } from "../../service/index";
import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index';

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
      Toast({
        context: this,
        selector: '#t-toast',
        message: "注册成功",
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }
  },
})

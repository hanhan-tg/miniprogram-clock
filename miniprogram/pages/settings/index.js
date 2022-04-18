import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index'

const { getMyInfo, resetInfo } = require("../../service/index")

// pages/settings/index.js
Page({

  data: {
    info: {},
    name: '',
    stuId: '',
    classname: ''
  },
  onLoad: async function (options) {
    const info = await getMyInfo();
    this.setData({
      info,
      name: info.name,
      stuId: info.stu_id,
      classname: info.classname
    })
  },
  async onClickSave() {
    const { info, name, stuId, classname } = this.data;
    if (info.name !== name || info.stu_id !== stuId || info.classname !== classname) {
      const res = await resetInfo({
        name: this.data.name.trim(),
        stu_id: this.data.stuId.trim(),
        classname: this.data.classname.trim()
      });
      if (res) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '保存成功',
          icon: 'check-circle',
        });
      } else {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '保存失败，请重试',
        });
        return;
      }
    }
    setTimeout(() => {
      wx.navigateBack();
    }, 2000);
  }
})
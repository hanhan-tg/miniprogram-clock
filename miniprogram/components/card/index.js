// components/card/index.js
const logo = getApp().require('assets/img/logo.png');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    stuid: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    logo: logo
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

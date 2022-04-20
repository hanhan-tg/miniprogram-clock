Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/assets/img/shouye.png",
      selectedIconPath: "/assets/img/shouye-check.png",
      text: "主页"
    }, {
      pagePath: "/pages/my/index",
      iconPath: "/assets/img/wode.png",
      selectedIconPath: "/assets/img/wode-check.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})
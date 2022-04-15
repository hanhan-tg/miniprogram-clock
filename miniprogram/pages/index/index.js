// index.js
const app = getApp()

Page({
  data: {
    headerText: '开大船',
    contentList: [{
      id: '111',
      content: '跳绳',
      select: false
    },{
      id: '222',
      content: '开大船',
      select: false
    },{
      id: '333',
      content: '跳绳',
      select: true
    }]
  },
  onLoad() {
  },
  async onClick(e) {
    // console.log('click', e.detail.id);
    const id = e.detail.id;
    const newList = this.data.contentList.map(v => {
      if(v.id === id){
        v.select = true;
      }
      return v;
    });
    this.setData({
      contentList: newList
    })
  },
  onAdd() {
    console.log('click add');
  }
});



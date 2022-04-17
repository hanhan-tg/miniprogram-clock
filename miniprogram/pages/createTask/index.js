// pages/createTask/index.js
import Toast from '../../miniprogram_npm/tdesign-miniprogram/toast/index';
import { createTask, getMyGroupAsLeader } from '../../service/index';
const timestamp2Date = require('../../utils/timestamp2Date')

Page({
  data: {
    groups: [],
    targetGroup: {},
    taskName: '',
    taskDescription: '',

    startTimeVisible: false,
    startTime: '',
    endTimeVisible: false,
    endTime: '',
    setStartOrEnd: 'start', // start || end
    // 指定选择区间起始值
    disableDate: {
      before: timestamp2Date(Date.now()),
      after: '2022-12-31 23:59:59',
    },
    
    popupVisible: false,
  },
  onSelectGroup() {
    this.setData({
      popupVisible: true,
    })
  },
  onClickStartPicker() {
    this.setData({
      startTimeVisible: true,
      setStartOrEnd: 'start'
    })
  },
  onClickEndPicker() {
    this.setData({
      endTimeVisible: true,
      setStartOrEnd: 'end'
    })
  },
  onVisibleChange({ detail }) {
    const { visible } = detail;
    this.setData({
      popupVisible: visible
    })
  },
  onConfirm(e) {
    this.setData({
      startTimeVisible: false,
      endTimeVisible: false,
      [this.data.setStartOrEnd === 'start' ? 'startTime' : 'endTime']: e.detail.formatValue
    })
  },
  onPickerCancel() {
    console.log('zzzzz');
    this.setData({
      startTimeVisible: false,
      endTimeVisible: false
    })
  },
  async onClickCreateBtn() {

    if (!this.data.startTime || !this.data.endTime || !this.data.taskName || !this.data.taskDescription || !this.data.targetGroup.groupName) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "请输入完整信息",
      });
      return;
    }
    if (new Date(this.data.startTime).getTime() >= new Date(this.data.endTime).getTime()) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: "开始时间不能早于结束时间",
      });
      return;
    }
    const res = await createTask({
      group_id: this.data.targetGroup.groupId,
      name: this.data.taskName,
      description: this.data.taskDescription,
      start_time: this.data.startTime,
      end_time: this.data.endTime
    });
    Toast({
      context: this,
      selector: '#t-toast',
      message: res ? "创建成功" : "创建失败",
    });
    if (res) {
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }
  },
  onClickGroup(e) {
    const { groupId, groupName } = e.currentTarget.dataset;
    this.setData({
      popupVisible: false,
      targetGroup: {
        groupId,
        groupName
      }
    })
  },
  onLoad: async function (options) {
    const groups = await getMyGroupAsLeader();
    this.setData({
      groups,
    })
  },
})
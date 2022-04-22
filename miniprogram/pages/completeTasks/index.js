import { deleteTask, getAllMyTasks, getCompleteTasks, updateTaskInfo } from "../../service/index"
import Message from '../../miniprogram_npm/tdesign-miniprogram/message/index'
import Dialog from '../../miniprogram_npm/tdesign-miniprogram/dialog/index'

// pages/completeClocks/index.js
Page({

  data: {
    completeTasks: [],
    allTasks: [],
    total: 0,
    isLoading: true,
    activePanelData: {
      isLoading: true,
      tasks: []
    },
    activeTaskId: '',
    activeGroupId: '',
    popupVisible: false,
  },
  onTabsChange({ detail }) {
    // console.log('change', e);
    this.setData({
      activePanelData: {
        isLoading: false,
        tasks: detail.value == '0' ? this.data.allTasks : this.data.completeTasks
      }
    })
  },
  onClickSetting(e) {
    const { taskId, groupId } = e.currentTarget.dataset;
    this.setData({
      activeTaskId: taskId,
      activeGroupId: groupId,
      popupVisible: true
    })
  },
  async onUpdateTaskInfo() {
    
  },
  async onDeleteTask() {
    Dialog.confirm({
      title: '是否删除任务',
      confirmBtn: '确定',
      cancelBtn: '取消',
    }).then(async () => {
      // 点击确定按钮时触发
      const res = await deleteTask({
        task_id: this.data.activeTaskId,
        group_id: this.data.activeGroupId
      })
      this.onLoad();
      Message.success({
        offset: [20, 32],
        duration: 3000,
        icon: false,
        content: res ? '删除成功' : '删除失败请重试',
      });
    });
    this.setData({
      popupVisible: false,
    })
  },
  onVisibleChange({ detail }) {
    const { visible } = detail;
    this.setData({
      popupVisible: visible
    })
  },
  onLoad: async function (options) {
    const { total, completeTasks } = await getCompleteTasks();
    const { allTasks } = await getAllMyTasks();
    console.log('tasks', allTasks);
    this.setData({
      completeTasks,
      allTasks,
      total,
      isLoading: false,
      activePanelData: {
        isLoading: false,
        tasks: allTasks
      }
    })
  },
})
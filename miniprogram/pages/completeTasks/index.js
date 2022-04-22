import { getAllMyTasks, getCompleteTasks } from "../../service/index"

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
    }
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
  onLoad: async function (options) {
    const { total, completeTasks } = await getCompleteTasks();
    const { allTasks } = await getAllMyTasks();
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
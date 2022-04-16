import { getCompleteTask } from "../../service/index"

// pages/completeClocks/index.js
Page({

  data: {
    tasks: [],
    total: 0
  },

  onLoad: async function (options) {
    const { total, completeTasks } = await getCompleteTask();
    this.setData({
      tasks: completeTasks,
      total
    })
  },
})
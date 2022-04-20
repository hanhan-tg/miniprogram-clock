// pages/dataAnalysis/index.js
import Toast from "../../miniprogram_npm/tdesign-miniprogram/toast/index"
import { getExportData, getMyGroupAsLeader, getTasksInGroup } from "../../service/index"

Page({
  data: {
    headers: ['姓名', '学号', '班级', '是否打卡', '打卡时间'],
    list: [],
    fileUrl: '',
    groupName: '暂无',
    taskName: '暂无',
    popupVisible: false,
    /**
     * renderItems: Array<{
     *    id: String,
     *    name: String,
     * }>
     */
    renderItems: [],
    groups: [],
    targetGroupId: '',
    targetTaskId: '',
    isExporting: false,
  },
  getFileUrl(fileID) {
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        // get temp file URL
        // console.log("文件下载链接", res.fileList[0].tempFileURL)
        this.setData({
          fileUrl: res.fileList[0].tempFileURL
        })
      },
      fail: err => {
        // handle error
      }
    })
  },
  copyFileUrl() {
    wx.setClipboardData({
      data: this.data.fileUrl,
      success(res) {
        wx.hideToast();
        wx.getClipboardData({
          success(res) {
            console.log("复制成功", res.data) // data
          }
        })
        Toast({
          context: this,
          selector: '#t-toast',
          message: '复制成功，请通过浏览器打开链接下载',
        });
      }
    })
  },
  onSelectGroup() {
    this.setData({
      renderItems: this.data.groups,
      popupVisible: true
    })
  },
  onSelectTask() {
    this.setData({
      popupVisible: true
    })
  },
  onClickExport({retry}) {
    if(!this.data.groupName || !this.data.taskName) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请选择任务',
      });
      return;
    }
    if(retry && retry > 5) return;

    this.setData({
      isExporting: true
    })
    wx.cloud.callFunction({
      name: 'excel',
      data: {
        filename: this.data.targetTaskId.substring(0, 8), // 任务id
        data: this.data.list
      }
    }).then((res) => {
      this.getFileUrl(res.result.fileID)
      Toast({
        context: this,
        selector: '#t-toast',
        message: '导出成功',
      });
      this.setData({
        isExporting: false
      })
    }).catch(() => {
      this.onClickExport(retry + 1 || 1)
    })
  },
  async onSelectOne(e) {
    const { id, type, name } = e.currentTarget.dataset;

    if(!id) {
      this.onLoad();
      return;
    }
    if (type === 'group') {
      this.setData({
        groupName: name,
        popupVisible: false,
      })
      const tasks = await getTasksInGroup({
        group_id: id
      })
      this.setData({
        targetGroupId: id,
        renderItems: tasks.map(t => {
          return {
            id: t.t_id,
            name: t.name,
            type: 'task',
          }
        }),
      })
    } else {
      this.setHeadersAndList({
        taskId: id,
        name,
      });
    }
  },
  async setHeadersAndList(params){
    const { taskId, name } = params;
    const data = await getExportData({
      task_id: taskId
    });
    this.setData({
      list: data,
      taskName: name,
      popupVisible: false,
      targetTaskId: taskId
    })
  },
  onPopupVisibleChange({ detail }) {
    const { visible } = detail;
    this.setData({
      popupVisible: visible
    })
  },
  onLoad: async function () {
    const groups = await getMyGroupAsLeader();
    const renderItems = groups.map(g => {
      return {
        id: g.g_id,
        name: g.name,
        type: 'group'
      }
    })
    this.setData({
      groups,
      renderItems
    })
  },
})
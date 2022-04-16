// components/group-task-daily/index.js

Component({
  properties: {
    headerText: String,
    contentList: {
      type: Array,
      value: []
    },
  },
  data: {

  },
  lifetimes: {
    created() {
    }
  },
  methods: {
    onClick(e) {
      const { id, complete } = e.currentTarget.dataset;
      this.triggerEvent('onTaskClick', {
        id,
        complete
      })
    }
  }
})

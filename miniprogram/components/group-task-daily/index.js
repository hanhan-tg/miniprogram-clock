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
      // console.log('created', headerText, contentList);
    }
  },
  methods: {
    onClick(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('onTaskClick', {
        id
      })
    }
  }
})

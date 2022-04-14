// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-1g9ke9h51379b9b0',
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { newUserCollection, newGroupCollection, newTaskCollection } = event;

  if (newUserCollection) {
    await db.collection('c_user').where({
      all: null,
    }).remove();
    newUserCollection.forEach((v, i) => {
      db.collection('c_user').add({
        data: v
      })
    })
  }
  if (newGroupCollection) {
    await db.collection('c_group').where({
      all: null,
    }).remove();
    newGroupCollection.forEach((v, i) => {
      db.collection('c_group').add({
        data: v
      })
    })
  }
  if (newTaskCollection) {
    await db.collection('c_task').where({
      all: null,
    }).remove();
    newTaskCollection.forEach((v, i) => {
      db.collection('c_task').add({
        data: v
      })
    })
  }
  return 'updateAllData'



  // arr.forEach((val, index, array) => {
  //   db.collection('todos').add({
  //     data: val
  //   })
  // })

  // const arr = [{
  //   a: 1,
  //   _id: '222'
  // }, {
  //   a: 2,
  //   _id: '333'
  // },{
  //   a: 3,
  //   _id: '444'
  // }, {
  //   a: 4,
  //   _id: '555'
  // }];
  // let msg = 'fail'
  // db.collection('todos').where({
  //   all: null
  // }).update({
  //   data: arr
  // }).then(() => msg = 'success')
  // db.collection('todos').where({
  //   all: null
  // }).get().then((res) => msg = res)

  // return msg
}
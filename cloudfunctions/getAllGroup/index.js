// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-1g9ke9h51379b9b0',
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('c_group').get();
}
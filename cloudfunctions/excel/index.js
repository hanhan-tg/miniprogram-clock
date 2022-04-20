const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-1g9ke9h51379b9b0',
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {filename, data} = event
    //1,定义excel表格名
    let dataCVS = filename + '.xlsx'
    //2，定义存储数据的
    let alldata = [];
    let row = ['姓名', '学号', '班级', '是否打卡', '打卡时间']; //表属性
    alldata.push(row);

    for (let key in data) {
      let arr = [];
      arr.push(data[key].name);
      arr.push(data[key].stuId);
      arr.push(data[key].classname);
      arr.push(data[key].isComplete);
      arr.push(data[key].completeTime);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: filename,
      data: alldata
    }]);
    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}
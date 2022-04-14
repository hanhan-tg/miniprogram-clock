const updateAllData = require('../controller/updateAllData');
const getOpenId = require('../controller/getOpenId');
const getAllUser = require('../controller/getAllUser');
/**
 * 
 * @param {String} stu_id 
 * @param {String} name 
 * @param {String} classname 
 */
export async function createUser(params) {
  const { stu_id, name, classname, user_id } = params;
  const myOpenId = await getOpenId();
  if (await isRegister()) {
    console.log('is registered');
    return false;
  }
  const users = await getAllUser();
  users.push({
    wx_id: myOpenId,
    groups: [],
    name,
    stu_id,
    classname,
    create_time: Date.now()
  })
  await updateAllData({
    c_user: users
  })
  return true
}

export async function isRegister() {
  if (await getMyInfo()) {
    return true
  }
  return false
}

export async function getMyInfo() {
  const OPENID = await getOpenId()
  const users = await getAllUser();
  const myInfo = users.find((v, i) => v.wx_id === OPENID);
  // console.log('getMyInfo', OPENID, users, myInfo);
  if (myInfo) {
    return {
      name: myInfo.name,
      stu_id: myInfo.stu_id,
      classname: myInfo.classname
    }
  }
  return {}
}

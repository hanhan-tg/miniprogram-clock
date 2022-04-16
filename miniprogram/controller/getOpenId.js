

module.exports = async () => {
  const res = await wx.cloud.callFunction({
    name: 'getOpenId'
  })
  
  return res.result.openid;
}
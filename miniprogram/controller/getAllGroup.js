

module.exports = async () => {
  const res = await wx.cloud.callFunction({
    name: 'getAllGroup'
  })
  return res.result.data
}
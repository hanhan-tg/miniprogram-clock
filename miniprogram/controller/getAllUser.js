

module.exports = async () => {
  const res = await wx.cloud.callFunction({
    name: 'getAllUser'
  })
  return res.result.data
}


module.exports = async () => {
  const res = await wx.cloud.callFunction({
    name: 'getAllTask'
  })
  return res.result.data
}

module.exports = function (time) {
  const t = new Date(+time);
  return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours() > 10 ? t.getHours() : '0' + t.getHours()}:${t.getMinutes() > 10 ? t.getMinutes() : '0' + t.getMinutes()}`
}
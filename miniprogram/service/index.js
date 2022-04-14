const groupServices = require('./groupServices');
const userServices = require('./userServices');
const taskServices = require('./taskServices');
module.exports = {
  ...groupServices,
  ...userServices,
  ...taskServices
}
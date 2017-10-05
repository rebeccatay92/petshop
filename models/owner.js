'use strict'
module.exports = function (sequelize, DataTypes) {
  var Owner = sequelize.define('Owner', {
    name: DataTypes.STRING
  })
  return Owner
}

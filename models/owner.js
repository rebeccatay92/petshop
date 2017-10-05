'use strict'
module.exports = function (sequelize, DataTypes) {
  var Owner = sequelize.define('Owner', {
    name: DataTypes.STRING
  })
  Owner.associate = function (models) {
    Owner.hasMany(models.Pet)
  }
  return Owner
}

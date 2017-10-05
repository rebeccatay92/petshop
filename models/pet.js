'use strict'
module.exports = function (sequelize, DataTypes) {
  var Pet = sequelize.define('Pet', {
    name: DataTypes.STRING
  })
  Pet.associate = function (models) {
    Pet.belongsTo(models.Owner)
  }
  return Pet
}

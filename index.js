const express = require('express')
const Sequelize = require('sequelize')

/* ----- setting up database config ------ */

// [dev] refers to object dev in config.json. if multiple env replace with [env], then config.json has multiple envs dev, prod, test
const config = require('./config/config.json')['development']
// console.log(config)

var sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {
  Owner: sequelize.import('./models/owner'),
  Pet: sequelize.import('./models/pet')
}

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
console.log(db)

db.sequelize = sequelize
db.Sequelize = Sequelize


/* -----express routing and port ------ */
const app = express()
app.get('/', function (req, res) {
  res.send('hello from root')
})
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})

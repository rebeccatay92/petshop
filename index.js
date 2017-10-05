const express = require('express')
const Sequelize = require('sequelize')

/* ----- setting up database config ------ */

// can replace [dev] with [env]
const config = require('./config/config.json')['development']

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

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

/* -----express routing and port ------ */
const app = express()
app.get('/', function (req, res) {
  res.render('index.html')
})
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`express is running on port ${port}`)
})

/* ----- testing assocs from backend ------ */
console.log('hello this is backend console')
db.Owner.findAll({
  include: [{
    model: db.Pet
  }]
})
.then(function (found) {
  var results = found.map(function (e) {
    return e.dataValues
  })
  console.log(results)
})

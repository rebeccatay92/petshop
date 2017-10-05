const express = require('express')

const app = express()

app.get('/', function(req,res) {
  res.send('hello from root')
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})

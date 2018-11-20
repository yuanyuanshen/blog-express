var express = require('express')

var app = express()

app.get('/', function (req, res) {
  // res.write('hello')
  // res.write('world')
  // res.end()

  res.send('hello world ...')
})

// app.use(express.static('./public/'))

app.use('/public/',express.static('./public/'))

app.listen(3000, function () {
  console.log('express app is runing .....')
})
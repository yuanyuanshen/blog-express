var express = require('express')

console.log(__dirname)
console.log(__filename)

var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

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
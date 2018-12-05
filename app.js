var express = require('express')

console.log(__dirname)
console.log(__filename)

var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
  console.log('After LOGGED')
}

var myLogger2 = function (req, res, next) {
  console.log('LOGGED2')
  next();
  console.log('After LOGGED2')
}

app.use(myLogger)
app.use(myLogger2)

app.get('/', function (req, res) {
  res.send('hello home ...')
})

app.get('/about', function (req, res) {
  res.send('hello about ...')
})

// app.use(express.static('./public/'))

app.use('/public/',express.static('./public/'))

app.listen(3000, function () {
  console.log('express app is runing .....')
})
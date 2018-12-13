var express = require('express')
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

app.listen(3006, function () {
  console.log('express app is runing .....')
})
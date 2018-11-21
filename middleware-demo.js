const express = require('express')

var app = express()

var router = express.Router()

// 不关心请求路径和请求方法的中间件

// app.use(function (req, res, next) {
//   console.log('all request must execute!!')
//   next()
// })

// app.use(function (req, res, next) {
//   console.log('all request must execute 1 !!')
//   next()
// })

// 以/XXX 开头的路径的中间件

// app.use('/user/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })

// 严格匹配请求方法和请求路径的中间件

app.get('/aa/bb', function (req, res, next) {
  console.log('/aa/bb')
  next()
})

router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  // res.render('special')
})

app.use('/', router)

app.listen(3000, function () {
  console.log('server is runing ...')
})
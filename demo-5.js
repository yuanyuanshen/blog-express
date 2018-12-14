const express = require('express')
const fs = require('fs')

var app = express()

var router = express.Router()

// 不关心请求路径和请求方法的中间件

app.use(function (req, res, next) {
  console.log('all request must execute!!')
  next()
})

app.use(function (req, res, next) {
  console.log('all request must execute 1 !!')
  next()
})

// 以/XXX 开头的路径的中间件

app.use('/user/:id', function (req, res, next) {
  res.send('Request USER')
})

app.use('/student/:id', function (req, res, next) {
  res.send('Request STUDENT')
})

// 严格匹配请求方法和请求路径的中间件

app.get('/aa/bb', function (req, res, next) {
  fs.readFile('c:/a/b/index.js', 'utf-8', function (err) {
    if (err) return next(err)
  })
})

app.get('/a/aa/aa', function (req, res, next) {
  throw new Error("我就是异常meimei    meimei meiei ！！！");
})

// 内置中间件

app.use('/public/', express.static('./public/'))

// 将中间件挂在在router上

// router.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })

// router.use('/user/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   console.log('Request Type:', req.method)
//   next()
// })

// router.get('/user/:id', function (req, res, next) {
//   console.log(req.params.id)
//   // res.render('special')
//   next()
// })

// app.use('/', router)

// 所有都匹配不到时 404 （放在最后）
app.use(function (req, res, next) {
  res.send('This is 404 !!!!!')
})

// 配置全局错误统一处理中间件
app.use(function (err, req, res, next) {
  res.status(500).json({
    err_code: 500,
    err_msg: err.message
  })
})

app.listen(3003, function () {
  console.log('server is runing ...')
})
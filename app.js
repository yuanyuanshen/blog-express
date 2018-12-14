var express = require('express')
var request = require('request');
var template = require('art-template')

console.log(__dirname)
console.log(__filename)

var app = express()


app.engine('art', require('express-art-template'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});

// 使用art-template例子
app.get('/index', function (req, res, next) {
  res.render('index.art', {
    user: {
      name: 'art-template',
      tags: ['art', 'template', 'nodejs']
    }
  });
});

// 获取豆瓣接口例子
app.get('/', function (req, res) {
  request('http://api.douban.com/v2/movie/in_theaters', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.send(body)
  });

})

app.use('/public/', express.static('./public/'))

app.listen(3002, function () {
  console.log('express app is runing .....')
})
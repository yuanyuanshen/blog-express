var http = require('http')

http.createServer(function (req, res) {
  // 主页
  if (req.url == "/") {
    res.end("Holle hemo!");
  }

  // About页
  else if (req.url == "/about") {
    res.end("Hello about!");
  }

}).listen('3009', 'localhost', function () {
  console.log('listen 3009 ....')
})
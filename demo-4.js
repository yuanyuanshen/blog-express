var http = require('http')
function express() {
  var taskArrray = []
  var app = function (req, res) {
    var i = 0
    function next() {
      var task = taskArrray[i++]
      if (!task) {
        return;
      }
      task(req, res, next);
    }
    next();
  }
  app.use = function (task) {
    taskArrray.push(task)
  }
  return app;
}

var app = express();
http.createServer(app).listen('3004', function () {
    console.log('listening 3000....');
});

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
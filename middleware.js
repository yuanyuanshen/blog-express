var connect = require('connect'),
    http = require('http');

var app = connect()
    .use(access)
    .use(test);

function access(req,res,next){
    var now = new Date().getHours();
    console.log(now)
    if(!(now <13 || now >18)){
        res.writeHead(503,{'Content-Type':'text/plain'});
        res.end('afternoon 1-6 has no ');
    }else{
        next();
    }
}

function test(req,res){
    res.writeHead(200,{'Connect-Type':'text/plain'});
    res.end('this is test page');
}

http.Server(app).listen(3000);
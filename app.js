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


app.get('/index', function(req, res, next) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
    next()
});

var myLogger = function(req, res, next) {
    console.log('LOGGED')
    next()
    console.log('After LOGGED')
}

var myLogger2 = function(req, res, next) {
    console.log('LOGGED2')
    next();
    console.log('After LOGGED2')
}

app.use(myLogger)
app.use(myLogger2)




app.get('/', function(req, res) {
    request('http://api.douban.com/v2/movie/in_theaters', function(error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(body)
    });

})

app.get('/about', function(req, res) {
    res.send('hello about ...')
})

// app.use(express.static('./public/'))

app.use('/public/', express.static('./public/'))

app.listen(3000, function() {
    console.log('express app is runing .....')
})
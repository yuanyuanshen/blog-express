var express = require('express')
var request = require('request');
var template = require('art-template')

var app = express()

app.get('/', function(req, res) {
  res.send('hello home ...')
})

app.get('/about', function(req, res) {
  res.send('hello about ...')
})

app.listen(3003, function() {
  console.log('express app is runing .....')
})
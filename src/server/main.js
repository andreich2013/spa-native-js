
var fs = require('fs');
var path = require('path');
var express = require('express');

var root = path.resolve(__dirname, '../../');
var app = express();

app.use('/src',  express.static(root + '/src'));
app.use('/Utilities',  express.static(root + '/Utilities'));

app.get(/^.*$/, function (req, res) {
  res.sendFile(root + '/src/app/index.html');
});

app.listen(3000, function () {
  console.log('App Server running on port 3000');
});


var api = express();

api.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accept', 'application/json');
  res.setHeader('Content-Type', 'application/json');

  next();
});

api.get('/movies', function (req, res) {
  var data = JSON.parse(fs.readFileSync(root + '/src/fixture/movies.json', 'utf8'));

  res.json(data);
});

api.get('/movies/:id', function (req, res) {
  var data = JSON.parse(fs.readFileSync(root + '/src/fixture/movies.json', 'utf8'));

  res.json(data.filter(function(item) { return +item.id === +req.params.id; })[0]);
});

api.listen(9000, function () {
  console.log('API Server running on port 9000');
});
var express = require('express');
var app = express();
var config = require('./config.js');
var path = require('path');
// var serveIndex = require('serve-index');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var fs = require('fs');

var logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

mongoose.connect('mongodb://localhost/securl');

app.use(morgan('short', {stream: logStream})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: 'true'
}));
app.set('view engine', 'jade');
app.set('views', path.join(config.appDir, 'views'));
app.use('/public', express.static(path.join(config.appDir, 'public')));
app.use('/bower_components', express.static(path.join(config.appDir, 'bower_components')));

var router = require('./api/router.js');
app.use('/', router); 

app.listen(80);


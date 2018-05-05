// require all the tools we need
var express = require('express');
var app = express();
var routes = require('./routes');
var port = process.env.port || 3000;
var morgan = require('morgan');
var path = require('path');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/', routes);
app.listen(port);

console.log("App is listening on port " + port);

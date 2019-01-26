var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(err) {
  if (err) {console.log('server.js: error');}
  console.log('Server started on http://%s:%s', process.env.IP, port);
});
var newrelic = require('newrelic')
var compression = require('compression')
var express = require('express')
var serveStatic = require('serve-static')


var app = express()

app.use(compression())
app.use(serveStatic(__dirname + '/dist', {
  maxAge: 31536000,
  setHeaders: setCustomCacheControl
}))

app.listen(process.env.PORT || 5000)

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'dist, max-age=0')
  }
}

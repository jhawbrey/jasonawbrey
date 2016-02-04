var newrelic = require('newrelic')
var compression = require('compression')
var express = require('express')
var serveStatic = require('serve-static')


var app = express()

app.use(compression())
app.use(serveStatic(__dirname + '/dist'))
app.listen(process.env.PORT || 5000)

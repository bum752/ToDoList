var config = require('./config')

// Express and Middleware
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var logger = require('morgan');

// Router
var apiRouter = require('./routes/api');

// MongoDB Connection
var mongoose = require('mongoose')

var mongodbUri = config.mongodb.uri
var mongodbOptions = config.mongodb.options
mongoose.connect(mongodbUri, mongodbOptions)

var conn = mongoose.connection
conn.on('error', function(error) {
  throw error;
})
// conn.once('open', function() {
//   console.log('Connected to mongodb')
// })

var port = process.env.PORT || 3001

if (process.env.NODE_ENV === 'production') app.use(logger('common'))
else if (process.env.NODE_ENV === 'development') app.use(loggger('dev'))

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/todo', apiRouter)

app.listen(port, function() {
  console.log('Express app running on port', port)
})

module.exports = app

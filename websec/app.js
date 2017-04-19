var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var app = express()
var port = process.env.PORT || 3000
var dbUrl = 'mongodb://localhost/node-mongodb'
var morgan = require('morgan')

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(session({
//   secret: 'node-mongodb',
//   store: new mongoStore({
//     url: dbUrl,
//     collection: 'sessions',
//   }),
//   resave: false,
//   saveUninitialized: true
// }))
app.use(session({
  secret: 'node-mongodb',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('node-mongodb start on port ' + port)

if ('development' === app.get('env')) {
  app.set('showStackError', true)
  app.use(morgan(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}
require('./config/routes')(app)

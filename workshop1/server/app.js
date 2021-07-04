var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
const bookRouter = require('./routes/books')
const cors = require('cors');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/', indexRouter);
app.use('/api/v1/books',bookRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(3000);

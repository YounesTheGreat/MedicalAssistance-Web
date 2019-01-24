const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

/* Customize View Engine -- Handlebars */
const hbs = require("hbs");
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
  .use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3000;
app.listen(PORT, _ => console.log("The applcation has started on Port", PORT));

module.exports = app;

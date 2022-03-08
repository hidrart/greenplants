var path = require('path');
var logger = require('morgan');
var express = require('express');
var flash = require('connect-flash');
var livereload = require('livereload');
var session = require('express-session');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var connectLiveReload = require('connect-livereload');
var connectDB = require('./server/database/connection');

// dotenv
var dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

// livereload
var livereloadServer = livereload.createServer({
	exts: ['js', 'css', 'ejs'],
});
livereloadServer.watch(path.join(__dirname, 'views'));
livereloadServer.watch(path.join(__dirname, 'public'));

// mongodb
connectDB();

// express
var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// session
app.use(
	session({
		secret: 'greenplants',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(connectLiveReload());
app.use(methodOverride('_method'));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var plantsRouter = require('./server/routes/plants');
var adminRouter = require('./server/routes/admin');
var apiRouter = require('./server/routes/api');

app.use(function (req, res, next) {
	req.active = req.path.split('/')[1];
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/plants', plantsRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

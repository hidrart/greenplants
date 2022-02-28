var express = require('express');
var router = express.Router();
var checkUser = require('../services/check-user');

/* GET users listing. */
router.get('/profile', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/login', checkUser, function (req, res, next) {
	if (res.locals.user != null) {
		res.redirect('/');
	} else {
		res.render('auth/login', {
			message: req.flash('message'),
			success: req.flash('success'),
		});
	}
});

router.get('/register', checkUser, function (req, res, next) {
	if (res.locals.user != null) {
		redirect('/');
	} else {
		res.render('auth/register', { message: req.flash('message') });
	}
});

module.exports = router;

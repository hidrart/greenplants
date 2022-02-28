var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function (req, res, next) {
	res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
	res.render('auth/login', { title: 'Green Plant', url: req.active, message: req.flash('message') });
});

router.get('/register', function (req, res, next) {
	res.render('auth/register', { title: 'Green Plant', url: req.active, message: req.flash('message') });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var checkUser = require('../services/check-user');

/* GET home page. */
router.get('/', checkUser, function (req, res, next) {
	res.render('index', { title: 'Green Plant', url: req.active, user: res.locals.user });
});

module.exports = router;

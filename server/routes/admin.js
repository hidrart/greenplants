var express = require('express');
var router = express.Router();
const axios = require('axios');
var createError = require('http-errors');

var excerpt = require('../services/excerpt');
var formatter = require('../services/formatter');
var checkUser = require('../services/check-user');

/* GET admin page page. */
router.get('/', checkUser, function (req, res, next) {
	var user = res.locals.user;

	if (user != null && user.role == 'admin') {
		axios
			.get('https://green-plant.herokuapp.com/api/plants')
			.then((response) => {
				res.render('admin', {
					url: req.active,
					plants: response.data,
					excerpt,
					formatter,
					user,
				});
			})
			.catch((err) => {
				next(createError(err));
			});
	} else {
		next(createError(403));
	}
});

/* GET plant create page */
router.get('/create', checkUser, function (req, res, next) {
	var user = res.locals.user;
	if (user != null && user.role == 'admin') {
		res.render('admin/create', { url: req.active, user });
	} else {
		next(createError(403));
	}
});

/* GET plant edit page */
router.get('/edit', checkUser, function (req, res, next) {
	var user = res.locals.user;

	if (user != null && user.role == 'admin') {
		if (req.query.id) {
			axios
				.get('https://green-plant.herokuapp.com/api/plants', { params: { id: req.query.id } })
				.then((response) => {
					res.render('admin/edit', { url: req.active, plant: response.data, excerpt, user });
				})
				.catch((err) => {
					next(createError(err));
				});
		} else {
			next(createError(404));
		}
	} else {
		next(createError(403));
	}
});

module.exports = router;

var express = require('express');
var router = express.Router();
var axios = require('axios');
var createError = require('http-errors');

var excerpt = require('../services/excerpt');
var formatter = require('../services/formatter');
var checkUser = require('../services/check-user');

/* GET home page. */
router.get('/', checkUser, function (req, res, next) {
	axios
		.get('https://green-plant.herokuapp.com/api/plants')
		.then((response) => {
			res.render('plants', { url: req.active, plants: response.data, excerpt, formatter, user: res.locals.user });
		})
		.catch((err) => {
			next(createError(err));
		});
});

router.get('/item', checkUser, function (req, res, next) {
	if (req.query.id) {
		axios
			.get('https://green-plant.herokuapp.com/api/plants', { params: { id: req.query.id } })
			.then((response) => {
				res.render('plant', {
					url: req.active,
					plant: response.data,
					excerpt,
					formatter,
					user: res.locals.user,
				});
			})
			.catch((err) => {
				next(createError(err));
			});
	} else {
		next(createError(404));
	}
});

module.exports = router;

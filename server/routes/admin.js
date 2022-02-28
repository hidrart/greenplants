var express = require('express');
var router = express.Router();
const axios = require('axios');
var createError = require('http-errors');

var excerpt = require('../services/excerpt');
var formatter = require('../services/formatter');

/* GET admin page page. */
router.get('/', function (req, res, next) {
	axios
		.get('http://localhost:3000/api/plants')
		.then((response) => {
			res.render('admin', { title: 'Plants', url: req.active, plants: response.data, excerpt, formatter });
		})
		.catch((err) => {
			next(createError(err));
		});
});

/* GET plant create page */
router.get('/create', function (req, res, next) {
	res.render('admin/create', { title: 'Green Plant', url: req.active });
});

/* GET plant edit page */
router.get('/edit', function (req, res, next) {
	if (req.query.id) {
		axios
			.get('http://localhost:3000/api/plants', { params: { id: req.query.id } })
			.then((response) => {
				res.render('admin/edit', { title: 'Plants', url: req.active, plant: response.data, excerpt });
			})
			.catch((err) => {
				next(createError(err));
			});
	} else {
		next(createError(404));
	}
});

module.exports = router;

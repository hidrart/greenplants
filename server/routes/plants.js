var express = require('express');
var router = express.Router();
var axios = require('axios');
var createError = require('http-errors');

var excerpt = require('../services/excerpt');
var formatter = require('../services/formatter');

/* GET home page. */
router.get('/', async function (req, res, next) {
	axios
		.get('http://localhost:3000/api/plants')
		.then((response) => {
			res.render('plants', { title: 'Plants', url: req.active, plants: response.data, excerpt, formatter });
		})
		.catch((err) => {
			next(createError(err));
		});
});

router.get('/item', function (req, res, next) {
	axios
		.get('http://localhost:3000/api/plants', { params: { id: req.query.id } })
		.then((response) => {
			res.render('plant', { title: 'Plants', url: req.active, plant: response.data, excerpt, formatter });
		})
		.catch((err) => {
			next(createError(err));
		});
});

module.exports = router;

var fs = require('fs');
var path = require('path');
var createError = require('http-errors');
var plantDatabase = require('../model/model');

const publicDir = path.join(__dirname, '../../public');

// retrive plant data & all plants
exports.find = (req, res, next) => {
	if (req.query.id) {
		plantDatabase
			.findById(req.query.id)
			.then((data) => {
				if (!data) {
					next(createError(404));
				} else {
					res.send(data);
				}
			})
			.catch((err) => {
				next, createError(err);
			});
	} else {
		plantDatabase
			.find()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				next(createError(err));
			});
	}
};

// crate and save new plant
exports.create = (req, res, next) => {
	// request validation
	if (!req.body) {
		next(createError(400));
		return;
	}

	// new plants
	const plant = new plantDatabase({
		name: req.body.name,
		category: req.body.category,
		price: req.body.price,
		description: req.body.description,
		image: req.file.filename,
	});

	plant
		.save(plant)
		.then((data) => {
			res.redirect('/plants');
		})
		.catch((err) => {
			next(createError(err));
		});
};

// update plants
exports.update = (req, res, next) => {
	// request validation
	if (!req.body) {
		next(createError(400));
		return;
	}

	var plant = {
		name: req.body.name,
		category: req.body.category,
		price: req.body.price,
		description: req.body.description,
	};

	if (req.file) {
		plant['image'] = req.file.filename;
	}

	// updateDatabase
	plantDatabase
		.findByIdAndUpdate(req.params.id, plant)
		.then((data) => {
			if (!data) {
				next(createError(500));
			} else {
				if (req.file) {
					fs.unlinkSync(path.join(publicDir, '/images/plant/' + data.image));
				}
				res.redirect('/plants');
			}
		})
		.catch((err) => {
			next(createError(err));
		});
};

// delete
exports.delete = (req, res, next) => {
	const id = req.params.id;
	plantDatabase
		.findByIdAndDelete(id)
		.then((data) => {
			if (!data) {
				next(createError(404));
			} else {
				fs.unlinkSync(path.join(publicDir, '/images/plant/' + data.image));
				res.redirect('/plants');
			}
		})
		.catch((err) => {
			next(createError(err));
		});
};

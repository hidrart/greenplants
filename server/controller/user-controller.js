var fs = require('fs');
var path = require('path');
var createError = require('http-errors');
var userDatabase = require('../model/user-model');
const bcrypt = require('bcryptjs');

const publicDir = path.join(__dirname, '../../public');

// retrive user data & all user
exports.find = (req, res, next) => {
	console.log(req.body);

	if (!req.body) {
		next(createError(404));
		return;
	}

	userDatabase
		.findOne({ email: req.body.email.trim() })
		.then((data) => {
			if (!data) {
				next(createError(404));
			} else {
				if (!bcrypt.compareSync(req.body.password, data.password)) {
					req.flash('message', 'Incorrect password');
					res.redirect('back');
				} else {
					res.redirect('/');
				}
			}
		})
		.catch((err) => {
			req.flash('message', 'Incorrect email');
			res.redirect('back');
		});
};

// crate and save new user
exports.create = (req, res, next) => {
	if (!req.body) {
		next(createError(404));
		return;
	}

	if (req.body.password.length < 8) {
		req.flash('message', 'password length minimum 8 character');
		res.redirect('back');
	}

	const user = new userDatabase({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password),
	});

	user.save(user)
		.then((data) => {
			res.redirect('/');
		})
		.catch((err) => {
			req.flash('message', 'email or username already registered');
			res.redirect('back');
		});
};

// update user
exports.update = (req, res, next) => {};

// delete user
exports.delete = (req, res, next) => {};

// search user
exports.search = (req, res, next) => {};

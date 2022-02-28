var createError = require('http-errors');
var userDatabase = require('../model/user-model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// retrive user data & all user
exports.login = (req, res, next) => {
	if (!req.body) {
		next(createError(404));
		return;
	}

	userDatabase
		.findOne({ email: req.body.email })
		.then((data) => {
			if (!data) {
				req.flash('message', 'Incorrect email');
				res.redirect('back');
			} else {
				if (!bcrypt.compareSync(req.body.password, data.password)) {
					req.flash('message', 'Incorrect password');
					res.redirect('back');
				} else {
					const token = jwt.sign(
						{ id: data._id, username: data.username, email: data.email, role: data.role },
						process.env.JWT_SECRET,
						{ expiresIn: '1800s' }
					);
					res.cookie('token', token);
					res.redirect('/');
				}
			}
		})
		.catch((err) => {
			console.log(err);
			req.flash('message', 'Incorrect email');
			res.redirect('back');
		});
};

// crate and save new user
exports.register = (req, res, next) => {
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
			if (!data) {
				next(createError(404));
			} else {
				req.flash('success', 'successfully registered');
				res.redirect('/users/login');
			}
		})
		.catch((err) => {
			req.flash('message', 'email or username already registered');
			res.redirect('back');
		});
};
// delete user
exports.logout = (req, res, next) => {
	res.cookie('token', null);
	res.redirect('/');
};

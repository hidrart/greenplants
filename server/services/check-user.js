var jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
	const token = req.cookies.token;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				res.locals.user = decodedToken;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = checkUser;

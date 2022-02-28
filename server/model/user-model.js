const { default: mongoose } = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: false,
	},
});

const userDatabase = mongoose.model('User', userSchema);
module.exports = userDatabase;

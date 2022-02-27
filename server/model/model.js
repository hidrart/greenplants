const { default: mongoose } = require('mongoose');

var plantShcema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

const plantDatabase = mongoose.model('Plant', plantShcema);
module.exports = plantDatabase;

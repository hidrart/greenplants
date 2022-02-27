var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'public/images/plant');
	},
	filename: (req, file, callback) => {
		let extArray = file.mimetype.split('/');
		let extension = extArray[extArray.length - 1];
		callback(null, file.fieldname + '-' + Date.now() + '.' + extension);
	},
});

var upload = multer({ storage: storage });
module.exports = upload;

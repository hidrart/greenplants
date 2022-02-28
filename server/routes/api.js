var express = require('express');
var router = express.Router();

var plantController = require('../controller/plant-controller');
var userController = require('../controller/user-controller');
var upload = require('../services/multer');

// plants get
router.get('/plants', plantController.find);

// plants create
router.post('/plants', upload.single('image'), plantController.create);

// plants update
router.put('/plants/:id', upload.single('image'), plantController.update);

// plants delete
router.delete('/plants/:id', plantController.delete);

// plants search
router.post('/plants/search', plantController.search);

// user login
router.post('/login', userController.find);

router.post('/register', userController.create);

module.exports = router;

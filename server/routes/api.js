var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');
var upload = require('../services/multer');

// plants get
router.get('/plants', controller.find);
// plants create
router.post('/plants', upload.single('image'), controller.create);
// plants update
router.put('/plants/:id', upload.single('image'), controller.update);
// plants delete
router.delete('/plants/:id', controller.delete);

module.exports = router;

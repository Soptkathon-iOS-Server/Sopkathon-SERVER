var express = require('express');
var router = express.Router();
const userController = require('../controllers/movie');

router.get('/', movieController.showAllMovie);

module.exports = router;
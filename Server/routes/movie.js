var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');
const authUtil  = require('../middlewares/auth').checkToken;

// 모든 영화
router.get('/',  movieController.readAllMovie);
// movie idx 값으로 조회
router.get('/:idx', movieController.searchMovie);

module.exports = router;
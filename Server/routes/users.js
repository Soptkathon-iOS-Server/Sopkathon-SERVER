var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// 회원가입
router.post('/signup',  userController.signup);

// 로그인
router.post('/signin',   userController.signin);
// user id 가 갖고 있는 모든 영화 정보를 반환
router.get('/:id', userController.getAllMovie);

// user_watched_movie table에 영화 및 유저 등록
router.post('/signmovie',  userController.signMovie)

module.exports = router;

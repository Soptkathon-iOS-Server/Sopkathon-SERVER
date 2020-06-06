var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authUtil  = require('../middlewares/auth').checkToken;

router.post('/signup', userController.signup);
router.post('/signin',  userController.signin);
// user id 가 갖고 있는 모든 영화 정보를 반환
router.get('/:id',userController.getAllMovie);
router.get('/profile/:id', authUtil, userController. readProfile);
// 
router.post('/signmovie', userController.signMovie)

module.exports = router;

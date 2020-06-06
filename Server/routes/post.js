var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const postController = require('../controllers/post');

router.get('/:questionFlag', postController.searchPost);
router.post('/', postController.createPost);
router.put('/:postIdx', postController.editPost);
router.delete('/:postIdx', postController.deletePost);
=======
const postController = require('../controllers/postController');
const authUtil  = require('../middlewares/auth').checkToken;

// 모든 게시글 조회
router.get('/', postController.readAllPost);
// 게시글 고유 id값을 조회
router.get('/:id', postController.readPost);
// 게시글 생성
router.post('/', authUtil, postController.createPost);
// 게시글 고유 id값을 가진 게시글 수정
router.put('/:id', authUtil, postController.modifyPost);
// 게시글 고유 id값을 가진 게시글 삭제
router.delete('/:id', authUtil, postController.deletePost);
>>>>>>> 605670c913bbe340b1eaae72e28d4f8a42dea15c

module.exports = router;
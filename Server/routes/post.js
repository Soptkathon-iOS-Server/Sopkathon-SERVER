var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

router.get('/:questionFlag',  postController.searchPost);
router.post('/',  postController.createPost);
router.delete('/:postIdx',  postController.deletePost);
router.get('/', postController.getAllPost)

module.exports = router;
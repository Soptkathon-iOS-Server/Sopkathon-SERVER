var express = require('express');
var router = express.Router();
const postController = require('../controllers/post');

router.get('/:postIdx', postController.searchPost);
router.post('/', postController.createPost);
router.put('/:postIdx', postController.editPost);
router.delete('/:postIdx', postController.deletePost);

module.exports = router;
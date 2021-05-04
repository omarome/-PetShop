// Router
'use strict';

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:id' , commentController.get_comment_list_by_id);
router.post('/',commentController.postCommentByPetId);

module.exports = router;
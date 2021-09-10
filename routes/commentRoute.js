// Router
'use strict';

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { body } = require('express-validator');

router.get('/:id' , commentController.get_comment_list_by_id);
router.post('/',
    body('pet_id').isNumeric,
    body('firstname').isLength({min: 1}).escape().blacklist(';,?,=,+,*'),
    body('lastname').isLength({min: 1}).escape().blacklist(';,?,=,+,*'),
    body('email').isEmail,
    body('subject').isLength({min: 2,max:100}).escape().blacklist(';,?,=,+,*'),
    commentController.postCommentByPetId);

module.exports = router;
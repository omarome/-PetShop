const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/')
.get(userController.user_list_get)
.post(userController.user_create_post);

module.exports = router;

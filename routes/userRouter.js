'use strict';
// userRoute
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();



router.get('/', userController.user_list_get);
router.get('/:id', userController.user_get_by_id);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete);

module.exports = router;
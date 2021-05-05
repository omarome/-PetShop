const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.route('/')
  .get(userController.user_list_get)
  .post(
    body('firstname').isLength({min: 3}).escape().blacklist('=,?,;,&,+,*'),
    body('lastname').isLength({min: 3}).escape().blacklist('=,?,;,&,+,*'),
    body('phone').isNumeric,
    body('address').isLength({min: 3}),
    body('username').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create_post);
router.route('/:id')
    .get( userController.user_get_by_id)
    .put( userController.user_update)
    .delete(userController.user_delete);

module.exports = router;

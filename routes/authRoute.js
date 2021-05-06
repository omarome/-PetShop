'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/login', authController.login);

router.post('/register',
    body('firstname').isLength({min: 3}).escape().blacklist('=,?,;,&,+,*,_,-'),
    body('lastname').isLength({min: 3}).escape().blacklist('=,?,;,&,+,*,_,-'),
    body('address').isLength({min: 5}),
    body('username').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    userController.user_create_post,
    authController.login,
);
router.get('/logout',authController.logout);


module.exports = router;
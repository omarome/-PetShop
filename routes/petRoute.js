// Router
'use strict';
const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');

router.get('/' , petController.pet_list_get);

module.exports = router;
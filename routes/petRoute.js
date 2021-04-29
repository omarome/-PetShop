// Router
'use strict';
const express = require('express');

const router = express.Router();

const petController = require('../controllers/petController');

router.get('/' , petController.pet_list_get);
router.get('/:id', petController.pet_get_by_id);
router.delete('/:id' , petController.pet_delete);
router.post('/',petController.pet_create);
router.post('/',petController.pet_update);

module.exports = router;
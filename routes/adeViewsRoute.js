'use strict';

const express = require('express');
const router = express.Router();
const adeViewsController = require('../controllers/adeViewsController');


router.get('/:id' , adeViewsController.getViewedTimesById);
router.post('/',adeViewsController.addView);
router.put('/',adeViewsController.updateView);

module.exports = router;
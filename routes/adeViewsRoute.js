'use strict';

const express = require('express');
const router = express.Router();
const adeViewsController = require('../controllers/adeViewsController');

router.route('/:id')
  .get( adeViewsController.getViewedTimesById)
  .put(adeViewsController.updateView);
router.post('/',adeViewsController.addView);


module.exports = router;
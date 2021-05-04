'use strict';
const adeViewsModel = require('../models/adeViewsModel');
const {  validationResult } = require('express-validator');

const getViewedTimesById = async (req, res) => {
  console.log('ade Views Controller: http get viewed times with path param', req.params);
  const petViews = await adeViewsModel.getViewedTimesByPetId(req.params.id);
  res.json(petViews);
};

const addView = async (req, res) => {
  try{
    const id = await adeViewsModel.postView(req);
    const viewObj= await adeViewsModel.getViewedTimesByPetId(id)
    res.send(viewObj);

  }catch (e){
    e.message;
  }
};
const updateView = async ( res, req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    console.log('update number of pet viewing times', req.body);
    const updated = await adeViewsModel.updateView(req.params.id, req);
    res.send('update ok: ',updated);

  }catch (e){
    e.message;
  }
};

module.exports = {
  addView,
  getViewedTimesById,
  updateView,
};
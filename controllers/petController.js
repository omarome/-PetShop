
'use strict';
const petModel = require('../models/petModel');


//const cats = catModel.cats;

const pet_list_get = async (req, res) => {
  console.log('get all pets from controller', req.query);

  const pets = await petModel.getAllPets();
  res.json(pets);
};

const pet_get_by_id = async (req, res) => {
  console.log('petController: http get cat with path param', req.params);
  const pet = await petModel.getPet(req.params.id);
  res.json(pet);
};


const pet_delete = async (req, res) => {
  const deleteOk = await petModel.deletePet(req.params.id);
  res.json(deleteOk);
};



module.exports = {
  pet_list_get,
  pet_delete,
  pet_get_by_id,
};


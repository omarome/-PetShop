
'use strict';
const petModel = require('../models/petModel');
const {  validationResult } = require('express-validator');

const pet_list_get = async (req, res) => {
  console.log('get all pets from controller', req.query);
  if (req.query.sort ) {
    const sortPets = await petModel.getAllPetsSorted(req.query.sort);
    res.json(sortPets);
    return;
  }

  const pets = await petModel.getAllPets();
  console.log(pets);
  res.json(pets);
};

const pet_get_by_id = async (req, res) => {
  console.log('petController: http get pet with path param', req.params);
  const pet = await petModel.getPet(req.params.id);
  res.json(pet);
};

const pet_create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('petController pet_create', req.body, req.body);
  const petOpj= req.body;
  petOpj.filename= req.file.filename;
  //petOpj.user_id = req.user.user_id;
  //petOpj.user_id = 1;
  const pet = await petModel.insertPet(petOpj);

  res.json(pet);
}
const pet_update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateOk = await petModel.petUpdate(req.params.id, req);
  res.send(`updated... ${updateOk}`);
};

const pet_delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const deleteOk = await petModel.deletePet(req.params.id);
  res.json(deleteOk);
};
const pet_get_by_user_id = async (req, res) => {
  console.log('petController: http get cat with path param', req.params);
  const pets = await petModel.getAllUserPets(req.params.id);
  res.json(pets);
};

module.exports = {
  pet_list_get,
  pet_delete,
  pet_get_by_id,
  pet_create,
  pet_update,
  pet_get_by_user_id,
};


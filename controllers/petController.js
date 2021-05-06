
'use strict';
const petModel = require('../models/petModel');

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
  console.log('petController pet_create', req.body, req.body);
  const petOpj= req.body;
  petOpj.filename= req.file.filename;
  //petOpj.user_id = req.user.user_id;
  //petOpj.user_id = 1;
  const id = await petModel.insertPet(petOpj);
  const pet = await petModel.getPet(id);
  res.send(pet);
};
const pet_update = async (req, res) => {

  console.log("req.body-12512", req.body);
  console.log("req.filee-12512", req.file);
  const updateOk = await petModel.petUpdate(req.params.id, req);
  // res.send(`updated... ${updateOk}`);
  res.json(updateOk);
};

const pet_delete = async (req, res) => {
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


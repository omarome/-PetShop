
'use strict';
const petModel = require('../models/petModel');


const pet_list_get = async (req, res) => {
  console.log('get all pets from controller', req.query);
  if (req.query.sort === 'pet_id') {
    const sortPets = await petModel.getAllPetsSorted('pet_id');
    res.json(sortPets);
    return;
  } else if (req.query.sort === 'pet_category_id') {
    const sortPets = await petModel.getAllPetsSorted('pet_category_id');
    res.json(sortPets);
    return;
  }

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


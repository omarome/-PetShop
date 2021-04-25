
'use strict';
const petModel = require('../models/petModel');


//const cats = catModel.cats;

const pet_list_get = async (req, res) => {
  console.log('get all pets from controller', req.query);

  const pets = await petModel.getAllPets();
  res.json(pets);
};


module.exports = {
  pet_list_get,

};


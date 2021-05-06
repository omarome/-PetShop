'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPets = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM USER_PET');
    console.log('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};
const getAllPetsSorted = async (order) => {
  try {
    const [rows] = await promisePool.query(
        `SELECT * FROM USER_PET,PET_CATEGORY WHERE USER_PET.PET_CATEGORY_ID = PET_CATEGORY.PET_CATEGORY_ID and PET_CATEGORY.CATEGORY_NAME='${order}' ORDER BY PET_CATEGORY.CATEGORY_NAME`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getPet = async (id) => {
  try {
    console.log('petModel getPet', id);
    const [rows] = await promisePool.execute('SELECT * FROM USER_PET WHERE pet_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('petModel:', e.message);
  }
};



const deletePet = async (id) => {
  try {
    console.log('petModel delete pet', id);
    const [rows] = await promisePool.execute('DELETE FROM  USER_PET WHERE pet_id = ?', [id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('petModel:', e.message);
  }
};

const insertPet = async (petObj) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO USER_PET (title, birthdate, breed, price, picture, description, user_id, pet_category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [petObj.title, petObj.birthdate, petObj.breed, petObj.price, petObj.filename , petObj.description,  petObj.user_id, petObj.pet_category_id]);

    console.log('petModel insert:', rows);
    return rows.insertId;
  } catch (e) {F
    console.error('petModel insertPet:', e);
    return 0;
  }
};

// const petUpdate = async (id, pet) => {
//   // const [row] = await promisePool.execute('UPDATE USER_PET SET `title`=?, `birthdate`=?, `breed`=?, `price`=?. `picture`=?, `description`=?, `pet_vst`=?, `user_id`=?, `pet_category_id`=? WHERE PET_ID=?',
//   //     [pet.title, pet.birthdate, pet.breed, pet.price, pet.picture, pet.description, pet.pet_vst, pet.user_id, pet.category_id]);
//   console.log("id", typeof id);
//
//   const [row] = await promisePool.execute('UPDATE USER_PET SET `title`=?, `birthdate`=?, `breed`=? WHERE PET_ID=?',
//       [pet.title, pet.birthdate, pet.breed, id]);
//   console.log('update row', row);
//   return row.insertId;
// };

const petUpdate = async (id, req) => {
  try {
    // console.log("id", typeof id, id);
    // console.log("request", req.body)
    // const [rows] = await promisePool.query('UPDATE REGISTER_USER SET firstname = ?, lastname = ?, email_address = ?, password = ?, phone_number = ?, picture = ?, address = ? WHERE user_ID = ?;',
    //     [req.body.firstname, req.body.lastname, req.body.email_address, req.body.password, req.body.phone_number, req.body.picture, req.body.address, id]);
    const [rows] = await promisePool.execute('UPDATE USER_PET SET `title`=?, `birthdate`=?, `breed`=?, `price`=?, `description`=?, `picture` = ? WHERE PET_ID=?',
       [req.body.title, req.body.birthdate, req.body.breed, req.body.price, req.body.description, req.file.filename, id]);
    console.log('petmodel update:', rows);
    return rows.affectedRows === 1
  } catch (e) {
    console.log("error", e)
    return false;
  }
};


const getAllUserPets = async (id) => {
  try {
    console.log('petModel getAllUserPets', id);
    const [rows] = await promisePool.execute('SELECT * FROM USER_PET WHERE user_id = ?', [id]);
    return rows;
  } catch (e) {
    console.error('petModel:', e.message);
  }
};

module.exports = {
  getAllPets,
  getAllPetsSorted,
  deletePet,
  getPet,
  insertPet,
  petUpdate,
  getAllUserPets,
};
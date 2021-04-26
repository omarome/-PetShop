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
        `SELECT * FROM USER_PET ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};
const getPet = async (id) => {
  try {
    console.log('petModel getCat', id);
    const [rows] = await promisePool.execute('SELECT * FROM project_pet WHERE PID = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const deletePet = async (id) => {
  try {
    console.log('catModel delete pet', id);
    const [rows] = await promisePool.execute('DELETE FROM project_pet WHERE PID = ?', [id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('petModel:', e.message);
  }
};



module.exports = {
  getAllPets,
  getAllPetsSorted,
  deletePet,
  getPet,

};
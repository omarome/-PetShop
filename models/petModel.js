'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPets = async () => {
  try {
    const [rows] = await promisePool.query('SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat, wop_user WHERE wop_cat.owner = wop_user.user_id');
    console.log('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};


module.exports = {
  getAllPets
};
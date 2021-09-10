// Model (usually gets data from database, in this case data is hard coded)
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT USER_PET.*, REGISTER_USER.firstname AS ownername FROM USER_PET, REGISTER_USER WHERE USER_PET.user_id = REGISTER_USER.user_id');
    console.log
    ('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error catModel', e.message);
  }
};

const getAllCatsSort = async (order) => {
  try {
    const [rows] = await promisePool.query(
        `SELECT USER_PET.*, REGISTER_USER.firstname AS ownername FROM USER_PET, REGISTER_USER WHERE USER_PET.user_id = REGISTER.user_id ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};


const insertCat = async (cat) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);',
        [cat.body.name, cat.body.age, cat.body.weight, cat.body.owner, cat.file.filename, cat.body.coords]);
    console.log('catModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('insertCat:', e.message);
    throw new Error('insertCat failed');
  }
};

const updateCat = async (cat) => {
  const [row] = await promisePool.execute('UPDATE wop_cat SET name=?,age=?,weight=?,owner=? WHERE cat_id=?', [cat.name, cat.age, cat.weight, cat.owner, cat.id]);
  console.log('updated row', row);
  return true;
};

const deleteCat = async (id) => {
  const [row] = await promisePool.execute('DELETE FROM `wop_cat` WHERE `cat_id`= ?', [id]);
  console.log('deleted row', row)
  return true;
};

const getCat = async (id) => {
  const [row] = await promisePool.query('SELECT * FROM USER_PET WHERE pet_id = ?', [id]);
  return row;
}


module.exports = {
  getAllCats,
  getAllCatsSort,
  insertCat,
  updateCat,
  deleteCat,
  getCat,
};

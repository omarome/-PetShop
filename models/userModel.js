'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT * FROM REGISTER_USER');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (user) => {
  const [row] = await promisePool.execute(
      'INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]);
  console.log('insert row', row);
  return row.insertId;
};
//usermodel
const getUserById = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute('SELECT * FROM REGISTER_USER WHERE user_ID = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
};

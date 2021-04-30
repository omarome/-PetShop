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

const getUser = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute('SELECT * FROM REGISTER_USER WHERE user_ID = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

//idk if works
// const updateUser = async (id, req) => {
//   try {
//     const [rows] = await promisePool.execute('UPDATE REGISTER_USER SET firstname = ?, lastname = ?, email_address = ?, password = ?, phone_number = ?, picture = ?, address = ?, user_type_id WHERE user_ID = ?;',
//         [req.body.firstname, req.body.lastname, req.body.email_address, req.body.password, req.body.phone_number, req.body.picture, req.body.address, req.body.user_type_id, id]);
//     console.log('userModel update:', rows);
//     return rows.affectedRows === 1;
//   } catch (e) {
//     return false;
//   }
// };


module.exports = {
  getAllUsers,
  addUser,
  getUser,
  // updateUser,
};

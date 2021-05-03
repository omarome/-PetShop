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


// const updateUser = async (id, req) => {
//   try {
//
//     console.log("id", typeof id);
//     console.log("req-666", req.body)
//
//     const [rows] = await promisePool.query('UPDATE REGISTER_USER SET firstname = ?, lastname = ?, email_address = ?, password = ?, phone_number = ?, picture = ?, address = ?, user_type_id WHERE user_ID = ?;',
//         [req.body.firstname, req.body.lastname, req.body.email_address, req.body.password, req.body.phone_number, req.body.picture, req.body.address, req.body.user_type_id, id]);
//     console.log('userModel update:', rows);
//
//     console.log("");
//
//     return rows.affectedRows === 1;
//
//   } catch (e) {
//     console.log("error", e)
//     return false;
//   }
// };

const updateUser = async (id, req) => {
  try {

    console.log("id", typeof id);
    console.log("req-666", req.body)

    // const [rows] = await promisePool.query('UPDATE REGISTER_USER SET firstname = ?, lastname = ?, email_address = ?, password = ?, phone_number = ?, picture = ?, address = ? WHERE user_ID = ?;',
    //     [req.body.firstname, req.body.lastname, req.body.email_address, req.body.password, req.body.phone_number, req.body.picture, req.body.address, id]);

    const [rows] = await promisePool.query('UPDATE REGISTER_USER SET password = ? WHERE user_ID = ?;',
    [req.body.password, id]);

    console.log('userModel update:', rows);

    console.log("");

    return rows.affectedRows === 1;

  } catch (e) {
    console.log("error", e)
    return false;
  }
};
module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
};

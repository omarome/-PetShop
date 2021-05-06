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

const addUser = async (req) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO REGISTER_USER (firstname, lastname, address, email_address, password) VALUES (?, ?, ?, ?, ?);',
        [req.firstname,req.lastname,req.address, req.username, req.password]);
    console.log('userModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('userModel insertUser:', e);
    return 0;
  }
};
//usermodel
const getUserById = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute('SELECT * FROM REGISTER_USER WHERE user_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};


const updateUser = async (id, req) => {
  try {
    console.log("id", typeof id);
    console.log("req-666", req.body)
    // const [rows] = await promisePool.query('UPDATE REGISTER_USER SET firstname = ?, lastname = ?, email_address = ?, password = ?, phone_number = ?, picture = ?, address = ? WHERE user_ID = ?;',
    //     [req.body.firstname, req.body.lastname, req.body.email_address, req.body.password, req.body.phone_number, req.body.picture, req.body.address, id]);

    const [rows] = await promisePool.query('UPDATE REGISTER_USER SET password = ? WHERE user_ID = ?;',
        [req.body.password, id]);
    console.log('userModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log("error", e)
    return false;
  }
};

const deleteUser = async (id) => {
  const [row] = await promisePool.execute(
      'DELETE FROM `REGISTER_USER` WHERE `user_id`= ?', [id]);
  console.log('deleted row', row)
};


module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
};

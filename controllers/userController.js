'use strict';

const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  console.log(users);
  res.json(users);
};

const user_create_post = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //here we will create a user with data comming from req...
  console.log('userController user_create', req.body);
  const id = await userModel.addUser(req);
  const user = await userModel.getUserById(id);
  res.send(user);
};

const user_get_by_id = async (req, res) => {
  console.log('userController: http get user with path param', req.params);
  const user = await userModel.getUserById(req.params.id);
  res.json(user);
}
const user_update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("req.params", req.params.id);
  console.log("req.body", req.body);

  const updateOk = await userModel.updateUser(req.params.id, req);
  // res.json(`updated... ${updateOk}`);

  res.json(updateOk)
};
const user_delete = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('delete user', req.params.id);
  const success = await userModel.deleteUser(req.params.id);
  res.send(`user deleted ${success}`);
};



module.exports = {
  user_list_get,
  user_create_post,
  user_get_by_id,
  user_update,
  user_delete,
};

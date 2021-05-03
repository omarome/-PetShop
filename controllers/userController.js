'use strict';

const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  console.log(users);
  res.json(users);
};

const user_create_post = async (req, res) => {
  const user = req.body;
  console.log(user);
  user.id = await userModel.addUser(user);
  delete user.passwd;
  res.json(user);
};
const user_get_by_id = async (req, res) => {
  console.log('userController: http get user with path param', req.params);
  const user = await userModel.getUserById(req.params.id);
  res.json(user);
}
const user_update = async (req, res) => {

  console.log("req.params", req.params.id);
  console.log("req.body", req.body);

  const updateOk = await userModel.updateUser(req.params.id, req);
 // res.json(`updated... ${updateOk}`);

  res.json(updateOk)
};



module.exports = {
  user_list_get,
  user_create_post,
  user_get_by_id,
  user_update,
};

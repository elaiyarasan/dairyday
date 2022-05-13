const { response } = require("express");
const { getUserFromDB } = require("./common/get-user-db");
const usertModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getUser = async (req, res = response) => {
  const { id } = req.params;
  const user = getUserFromDB({ id });

  if (user) {
    res.json({
      user,
    });
  }
  else res.sendStatus(404);
};

const createUser = async (req, res = response) => {
  const data = req.body;
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  const user = await usertModel.findOne({ email:data.email.toLowerCase()});
if(user){
  return res.status(403).json(user);
}
  const formData = await new usertModel({
    name: data.name ? data.name : 'null',
    email: data.email ? data.email.toLowerCase() : 'null',
    phone: data.phone ? data.phone : 'null',
    password : password,
    display_order: data.display_order ? data.display_order : 'null',
    role: data.role ? data.role : 'null',
    visibility: data.visibility ? data.visibility : 'null',
  }).save();
  return res.json(formData);
};

const getAllUser = async (req, res = response) => {
  const formData = await usertModel.find();
  return res.json(formData);
};

module.exports = {
  getUser,createUser,getAllUser
};
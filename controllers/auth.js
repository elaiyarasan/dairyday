const { response } = require("express");
const { generateAccessToken } = require("../utills/token-generator");
const { getUserFromDB } = require("./common/get-user-db");
const usertModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const login = async (req, res = response) => {
  const password = req.body.password;
  const email = req.body.email;
  const user = await usertModel.findOne({ email:email.toLowerCase()}).select("+password");
  const isMatch = await bcrypt.compare(password, user.password)
  if (user && isMatch) {
    const token = generateAccessToken(user?.username);
    res.json({
      token: `Bearer ${token}`,
      user: user,
    });
  } else res.sendStatus(401);
};

module.exports = {
  login,
};
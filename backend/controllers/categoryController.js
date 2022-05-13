const { response } = require("express");
const { getUserFromDB } = require("./common/get-user-db");
const categoryModel = require('../models/category.model');
const createCategory = async (req, res = response) => {
    const data = req.body;
    const formData = await new categoryModel({
      category_name: data.category_name ? data.category_name : 'null',
      quantity: data.quantity ? data.quantity : 'null',
      visibility: data.visibility ? data.visibility : 'null',
  }).save();
    return res.json(formData);
};

const categoryList = async (req, res = response) => {
  const data = await categoryModel.find();
  return res.json(data);
};

module.exports = {
  createCategory,categoryList
};
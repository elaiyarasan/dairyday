const { response } = require("express");
const { getUserFromDB } = require("./common/get-user-db");
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const mongoose = require('mongoose');

const createProduct = async (req, res = response) => {
  const data = req.body;
  const formData = await new productModel({
    category_id: data.category_id ? data.category_id : 'null',
    product_name: data.product_name ? data.product_name : 'null',
    pieces_per_outer: data.pieces_per_outer ? data.pieces_per_outer : 'null',
    mrp_per_outer: data.mrp_per_outer ? data.mrp_per_outer : 'null',
    mrp_per_pieces: data.mrp_per_pieces ? data.mrp_per_pieces : 'null',
    display_order: data.display_order ? data.display_order : 'null',
    sale_type: data.sale_type ? data.sale_type : 'null',
    visibility: data.visibility ? data.visibility : 'null',
  }).save();
  return res.json(formData);
};

const productList = async (req, res = response) => {

  var data = await productModel.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $project: {
        _id: 1,
        category_id: 1,
        product_name: 1,
        visibility: 1,
        pieces_per_outer: 1,
        mrp_per_outer: 1,
        mrp_per_pieces: 1,
        sale_type: 1,
        display_order: 1,
        updatedAt: 1,
        category: { $first: "$category" }
      },
    }
  ]).sort({
    display_order: 1,
  });

  return res.json(data);
};

const listByCategory = async (req, res = response) => {

  var data = await categoryModel.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: "_id",
        foreignField: "category_id",
        as: "products",
      },
    }
  ]).sort({
    display_order: 1,
  });
  var productBasedOnCategory = {};
  await data.map(async (category, index) => {
    productBasedOnCategory[category._id] = [];
    let productData = await category.products;
    if (productData && productData.length > 0) {
      productData.map((product, i) => {
        productBasedOnCategory[category._id].push({ value: product._id, label: product.product_name })
      });
    }
  });
  return res.json(productBasedOnCategory);
};



module.exports = {
  createProduct, productList, listByCategory
};
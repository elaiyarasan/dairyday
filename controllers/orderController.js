const { response } = require("express");
const { getUserFromDB } = require("./common/get-user-db");
const orderModel = require('../models/order.model');
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const mongoose = require('mongoose');

const createOrder = async (req, res = response) => {
  const data = await req.body.order_collection;
  const user_id = req.body.user_id;
  const total_amount = req.body.total_amount;

  const orderId = new Date().getTime() + Math.floor(1000 + Math.random() * 9000);
  for (let i = 0; i < data.length; i++) {
    await new orderModel({
      order_id: orderId,
      user_id: user_id ? user_id : 'null',
      category_id: data[i].category_id ? data[i].category_id : 'null',
      product_id: data[i].product_id && data[i].product_id.value ? data[i].product_id.value : 'null',
      pieces_per_outer: data[i].pieces_per_outer ? data[i].pieces_per_outer : 'null',
      quantity: data[i].quantity ? data[i].quantity : 'null',
      amount: data[i].amount ? data[i].amount : 'null',
      mrp_per_outer: data[i].mrp_per_outer ? data[i].mrp_per_outer : 'null',
      mrp_per_pieces: data[i].mrp_per_pieces ? data[i].mrp_per_pieces : 'null',
      sale_type: data[i].sale_type ? data[i].sale_type : 'null',
      total_amount:total_amount ? total_amount : 'null',
      status: 'ordered'
    }).save();
  }
  
  return res.json({data:"Order succesully placed!"});
};

const orderList = async (req, res = response) => {

  const data = await orderModel.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: "product_id",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: "user_id",
        foreignField: "_id",
        as: "users",
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
        amount:1,
        quantity:1,
        display_order: 1,
        order_id:1,
        updatedAt: 1,
        status:1,
        category: { $first: "$category" },
        products: { $first: "$products" },
        users: { $first:"$users" },
        user_id:1
      },
    },
    { 
     $group:
        {
            _id:"$order_id",
            product: {
              $push: {
              'mrp_per_outer':'$mrp_per_outer',
              'total_amount':'$total_amount',
              'quantity':'$quantity',
              'pieces_per_outer':'$pieces_per_outer',
              'mrp_per_outer':'$mrp_per_outer',
              'mrp_per_pieces':'$mrp_per_pieces',
              'status':'$status',
              'sale_type':'$sale_type',
              'category':'$category',
              'products':'$products',
              'updatedAt':'$updatedAt',
              'users':'$users',
            },
          },
          amount: {
                    $sum: {
                      $toDouble: "$amount"
                    }
                  },
          status:{
              $first:"$status"
            },
          user_id:{
            $first:"$user_id"
          },
          user_email:{
            $first:"$users.email"
          },
          count: { $sum: 1 }
        }
        },
        {
					$match: { user_id: mongoose.Types.ObjectId(req.params.id) }
				},
  ]).sort({
    updatedAt:1
  });

  return res.json(data);
};



const orderData = async (req, res = response) => {

  const data = await orderModel.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: "category_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: "product_id",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: "user_id",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $project: {
        _id: 1,
        pieces_per_outer: 1,
        mrp_per_outer: 1,
        mrp_per_pieces: 1,
        sale_type: 1,
        amount:1,
        order_id:1,
        updatedAt: 1,
        status:1,
        quantity:1,
        total_amount:1,
        catergory_id:{ $first: "$category._id" },
        category_name: { $first: "$category.category_name" },
        category_quantity: { $first: "$category.quantity" },
        product_name: { $first: "$products.product_name" },
        users: { $first:"$users.name" },
      },
    },
        {
					$match: { order_id: req.params.id }
				}
  ]).sort({
    catergory_id: 1,
  });

  return res.json(data);
};



module.exports = {
  createOrder,orderList,orderData
};
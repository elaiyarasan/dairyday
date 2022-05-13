const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
    order_id:{
        type: String, 
        required:true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    amount:{
        type: String, 
        required:true
    },
    total_amount:{
        type: String, 
        required:true
    },
    quantity: {
        type: String, 
        required:true
    },
    sale_type: {
        type: String, 
        required:true
    },
    pieces_per_outer: {
        type: String, 
        required:true
    },
    mrp_per_outer: {
        type: String, 
        required:true
    },
    mrp_per_pieces: {
        type: String, 
        required:true
    },
    status:{
        type: String, 
        required:true
    }
    }, 
{
    timestamps: true
}
);

const orderModel = mongoose.model('orders', order);

module.exports = orderModel;
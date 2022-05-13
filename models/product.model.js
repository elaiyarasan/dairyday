const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const products = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    product_name:{
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
    sale_type: {
        type: String, 
        required:true
    },
    display_order: {
        type: Number, 
        required:true
    },
    visibility: {
        type: String, 
        required:true
    },
}, 
{
    timestamps: true
}
);

const productModel = mongoose.model('products', products);

module.exports = productModel;
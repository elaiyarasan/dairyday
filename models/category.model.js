const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const category = new Schema({
    category_name: {
        type: String, 
        required: true
    },
    quantity: {
        type: String, 
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

const categoryModel = mongoose.model('categories', category);

module.exports = categoryModel;
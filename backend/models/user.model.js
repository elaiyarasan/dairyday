const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String, 
        required:true
    },
    email:{
        type: String, 
        required:true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String, 
        required:true
    },
    role:{
        type:{enum: ['admin','distributor']}, 
        required:true
    },
}, {
    timestamps: true
});

const User = mongoose.model('users', userSchema);

module.exports = User;
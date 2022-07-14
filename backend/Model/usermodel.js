const mongoose = require('mongoose');
const { Schema } = mongoose;

const userschema = new Schema(
    {
        Name:{
            type: String,
            required: true
        },
        Email:{
            type: String,
            unique: true,
            required: true
        },
        Password: String,
        isVendor:{
            type: Boolean,
            default: false
        },
        isAdmin:{
            type: Boolean,
            default: false
        }
    }
)

const User = mongoose.model('User', userschema)

module.exports = User
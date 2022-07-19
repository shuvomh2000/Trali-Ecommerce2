const mongoose = require('mongoose')
const {Schema} = mongoose

const productschema = new Schema({
    name:{
        type: String,
        requied: true
    },
    brand:{
        type: String,
        requied: true
    },
    category:{
        type: String,
        requied: true
    },
    position:{
        type: String,
    },
    image:{
        type: String,
        requied: true
    },
    price:{
        type: Number,
        requied: true
    },
    color:{
        type: [String],
        requied: true
    },
    size:{
        type: [String],
        requied: true
    },
    description:{
        type: String,
        requied: true
    }
})

const Product = mongoose.model('product', productschema)

module.exports = Product
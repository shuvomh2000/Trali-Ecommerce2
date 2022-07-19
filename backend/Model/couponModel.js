const mongoose = require('mongoose')
const {Schema} = mongoose

const couponSchema = new Schema({
    coupon:{
        type: String,
        requied:true,
        unique:true
    },
    discount:{
        type: Number,
        requied:true,
    }
})

const Coupon = mongoose.model('coupon',couponSchema)
 module.exports = Coupon
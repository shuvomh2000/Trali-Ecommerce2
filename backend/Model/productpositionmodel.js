const mongoose = require('mongoose')
const {Schema} = mongoose

const productposiotnschema = new Schema({
    label:{
        type:String,
        required: true,
        unique: true
    }
})

const Productposition = mongoose.model('Productposition',productposiotnschema)

module.exports = Productposition
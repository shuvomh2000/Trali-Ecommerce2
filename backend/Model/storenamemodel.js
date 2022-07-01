const mongoose = require('mongoose')
const {Schema} = mongoose

const storenameSchema = new Schema({
    storename:{
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ownername:{
        type: String,
        required: true
    }
})

const Storename = mongoose.model('Storename',storenameSchema)
module.exports = Storename
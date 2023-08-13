const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cardSchema =  new Schema({
    cnumber: {
        type:Number,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
      },
    status:{
        type: String,
        required: true,
    },
}, {timestamps: true})

module.exports = mongoose.model('card', cardSchema)

 

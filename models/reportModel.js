const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema =  new Schema({
    code: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
      },
}, {timestamps: true})

module.exports = mongoose.model('report', reportSchema)

 

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema =  new Schema({
    nic: {
        type: Number,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true,
      },
    salary: {
        type: Number,
        required: true,
      },

      
}, {timestamps: true})

module.exports = mongoose.model('employee', employeeSchema)

 

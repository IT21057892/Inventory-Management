const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name : {
        type: String ,
        required : true
    },
    offers : {
        type : String ,
        required : true    
    },
    price : {
        type : String ,
        required : true    
    },

    imageurls : [],

    currentbookings : [],

    description :{
        type : String,
        required : true
    }
   

} , {
    timestamps : true, 

} )


const orderModel = mongoose.model('orders' , orderSchema)

module.exports = orderModel
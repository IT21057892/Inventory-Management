
const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    order : {
        type: String ,
        required : true
    },
    orderid : {
        type : String ,
        required : true    
    },
    userid : {
        type : String ,
        required : true    
    },
    quantity : {
        type : Number ,
        required : true    
    },

    transactionId : {
        type : String ,
        required : true
    },
    status :{
        type : String,
        required : true ,
        default : 'booked'
    },
    totalAmount : {
        type : Number ,
        required : true    
    },
   



} , {
    timestamps : true,
})


const bookingmodel = mongoose.model('bookings' , bookingSchema);

module.exports = bookingmodel
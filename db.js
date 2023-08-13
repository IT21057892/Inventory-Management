const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://biogas4itp:biogas123@cluster0.d3ch0qv.mongodb.net/Items?retryWrites=true&w=majority'


mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true })

var connection = mongoose.connection

connection.on('error' , ()=> {
    console.log('Mongo DB connection failed')
} )

connection.on('Connected' , ()=> {
    console.log('Mongo DB connection successful')
})



module.exports = mongoose
const express=require("express");
const usersRoute = require('./routes/usersRoute')
const itemRoutes = require('./routes/items')
const employeeRoutes = require('./routes/employees')
const cardsRoute = require('./routes/cards')
const reportRoutes = require('./routes/reports')
const ordersRoute = require('./routes/ordersRoute')
const bookingsRoute = require('./routes/bookingsRoute')

const app=express();

app.use(express.json())

app.use('/api/users' , usersRoute)
app.use('/api/items',itemRoutes)
app.use('/api/employees',employeeRoutes)
app.use('/api/cards' , cardsRoute)
app.use('/api/reports',reportRoutes)
app.use('/api/orders' , ordersRoute)
app.use('/api/bookings' , bookingsRoute)



const mongoose =require("mongoose")
const dotenv=require("dotenv");
require("dotenv").config();

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongodb")
      } catch (error) {
        throw error 
      }
}

mongoose.connection.on("disconnected", ()=>{
  console.log("mongoDB disconnected")
});

const PORT = 5001;

app.listen(PORT,()=>{
    connect()
    console.log(`node server started using nodemon`)

}); 
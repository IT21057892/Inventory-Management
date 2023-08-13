const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Order = require("../models/order");

const moment = require("moment");

const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Mw0Y3GaX4dMd9PhApuTiyEpaLOGir6kJURdvenBBB8jQYlIsMpguv4YFq5389AWchHu2MBn212PhgU4o1nxPQEP00XysDvEmg"
);

//Book order

router.post("/bookorderbyid", async (req, res) => {
  const { order, userid, totalAmount, quantity, token } =
    req.body;

    console.log(order)
    console.log(quantity)
    console.log(userid)
    console.log(totalAmount)

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    


      const newbooking = new Booking({
        order: order.name,
        orderid: order._id,
        userid,
        quantity,
        totalAmount,
        transactionId: "1234",
      });

      newbooking.save().then(function(){
        console.log("awa")}).catch(function (error){
        console.log(error)
      });

      
    

    res.send("Payement Successfull , Your order is Booked");
  
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, orderid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = "cancelled";
    await bookingitem.save();

    const order = await Order.findOne({ _id: orderid });

    const bookings = order.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    order.currentbookings = temp;

    await order.save();

    res.send("Your Booking cancell succesfully");
  } catch (error) {
    console.log({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/deletebooking/:bookingid", async (req, res) => {
  const bookingid = req.params.bookingid;
  console.log(bookingid);

  try {
    const bookings = await Booking.findByIdAndDelete(bookingid);
    if (!bookings) {
      return res.status(404).json({ error: "booking not found" });
    }
    res
      .status(200)
      .json({ message: `booking ${bookings._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }
  
}
);



module.exports = router;

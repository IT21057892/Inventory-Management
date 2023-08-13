const express = require("express");
const router = express.Router();

const Order = require('../models/order')

//Create
router.post("/", async (req,res)=>{
   const newOrder=new Order(req.body)
   try{
       const savedOrder= await newOrder.save()
       res.status(200).json(savedOrder)

   }catch(err){
       res.status(500).json(err)
   }
})





router.get("/getallorders", async(req, res) => {

   try{

    const orders = await Order.find()
    res.send(orders);

   } catch(error){
    return res.status(400).json({message : error});
   }

} );

router.post("/getorderbyid", async(req, res) => {
 
   const orderid = req.body.orderid
   console.log(orderid)
   try{
    const order = await Order.findById(orderid)
    res.send(order);

   } catch(error){

    return res.status(400).json({message : error}); 
   }

} );




router.post("/addorder" , async (req,res) => {

    try {

        const neworder = new Order(req.body)
        await neworder.save()

        res.send('New Order Added Successfully')
        
    } catch (error) {

        return res.status(400).json({error});
        
    }

})

router.delete("/deleteorder/:orderid", async (req, res) => {

    const orderid = req.params.orderid
    console.log(orderid)

  try {
    const order = await Order.findByIdAndDelete(orderid);
    if (!order) {
      return res.status(404).json({ error: 'Regorder not found' });
    }
    res.status(200).json({ message: `Regorder ${order._id} has been removed.` });
  } catch (err) {
    res.status(500).json(err);
  }

})

//update
router.put("/updateorder/:orderid" , async (req,res,next)=>{
    try{
        console.log("fail")
        console.log(req.params.userid)
        const updateorder= await Order.findByIdAndUpdate(req.params.orderid, {$set:req.body}
            ,{new:true})
        res.status(200).json(updateorder);

    }catch(err){
        next(err);
    }
}
)

//get 

router.get("/get/:orderid" , async (req,res,next)=>{
    try{
        console.log(req.params.orderid)
        const viewOrder= await Order.findById(req.params.orderid);
        res.status(200).json(viewOrder);


    }catch(err){
        next(err);
    }
}
)
  
module.exports = router;
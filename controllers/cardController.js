const Card = require('../models/cardModel')
const mongoose = require('mongoose')

//get all cards
const getCards = async(req, res)=>{
    const cards = await Card.find({}).sort({createdAt: -1})

    res.status(200).json(cards)
}


//get a single card
const getCard = async(req, res)=> {
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such card"})
    }

    const card = await Card.findById(id)

    if(!card){
        return res.status(404).json({error: "No Such card"})
    }

    res.status(200).json(card)
}


//create new card
const createCard = async (req, res)=>{
    const {cnumber, name, address, date, cvv, status} = req.body

    //add doc to db
    try{
        const card= await Card.create({cnumber, name, address, date, cvv, status})
        res.status(200).json(card)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a card
const deleteCard = async(req, res)=> {
    const{id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such card"})
    }

    const card = await Card.findOneAndDelete({_id: id})

    if(!card){
        return res.status(400).json({error: "No Such card"})
    }

    res.status(200).json(card)

}


//update a card
const updateCard = async(req, res)=>{
    const{id}= req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such card"})
    }

    const card = await Card.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!card){
        return res.status(400).json({error: "No Such card"})
    }

    res.status(200).json(card)
}

module.exports= {
    getCards,
    getCard,
    createCard,
    deleteCard,
    updateCard
} 
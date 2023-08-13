const express = require('express')
const {
    createCard,
    getCards,
    getCard,
    deleteCard,
    updateCard
}= require('../controllers/cardController')

const router =express.Router()

//Get all cards
router.get('/', getCards)

//Get a single Card
router.get('/:id', getCard)

//Post a new Card
router.post('/', createCard)

//Delete a Card
router.delete('/:id', deleteCard)

//Update a Card
router.patch('/:id', updateCard)


module.exports = router






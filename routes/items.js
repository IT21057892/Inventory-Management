const express = require('express')
const {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem
}= require('../controllers/itemController')

const router =express.Router()

//Get all items
router.get('/', getItems)

//Get a single Item
router.get('/:id', getItem)

//Post a new Item
router.post('/', createItem)

//Delete a Item
router.delete('/:id', deleteItem)

//Update a Item
router.patch('/:id', updateItem)


module.exports = router
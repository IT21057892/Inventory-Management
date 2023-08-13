const express = require('express')
const {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee
}= require('../controllers/employeeController')

const router =express.Router()

//Get all employees
router.get('/', getEmployees)

//Get a single Employee
router.get('/:id', getEmployee)

//Post a new Employee
router.post('/', createEmployee)

//Delete a Employee
router.delete('/:id', deleteEmployee)

//Update a Employee
router.patch('/:id', updateEmployee)


module.exports = router
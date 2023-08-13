const express = require('express')
const {
    createReport,
    getReports,
    getReport,
    deleteReport,
    updateReport
}= require('../controllers/reportController')

const router =express.Router()

//Get all reports
router.get('/', getReports)

//Get a single Report
router.get('/:id', getReport)

//Post a new Report
router.post('/', createReport)

//Delete a Report
router.delete('/:id', deleteReport)

//Update a Report
router.patch('/:id', updateReport)


module.exports = router
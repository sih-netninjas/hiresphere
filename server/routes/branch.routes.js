const express = require('express')
const router = express.Router()
const branchController = require('../controllers/branch.controller')

router.post('/', branchController.createBranch)
router.get('/', branchController.getAllBranches)

module.exports = router

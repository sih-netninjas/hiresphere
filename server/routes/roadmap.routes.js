const express = require('express')
const router = express.Router()
const roadmapController = require('../controllers/roadmap.controller')

router.post('/', roadmapController.createRoadmap)
router.get('/', roadmapController.getAllRoadmaps)

module.exports = router

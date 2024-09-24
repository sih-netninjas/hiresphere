const Roadmap = require('../models/Roadmap.model')

exports.createRoadmap = async (req, res) => {
  try {
    const { branchId, skill, roadmap, difficulty, prerequisite } = req.body

    if (!branchId || !skill) {
      return res
        .status(400)
        .json({ message: 'Branch ID and skill ID are required.' })
    }

    const newRoadmap = new Roadmap({
      branchId,
      skill,
      roadmap,
      difficulty,
      prerequisite,
    })

    const savedRoadmap = await newRoadmap.save()

    return res.status(201).json({
      message: 'Roadmap created successfully.',
      roadmap: savedRoadmap,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An error occurred while creating the roadmap.' })
  }
}
exports.getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find()
      .populate('branchId') // Populate branch details
      .populate('skill') // Populate skill details

    return res.status(200).json(roadmaps)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An error occurred while fetching roadmaps.' })
  }
}

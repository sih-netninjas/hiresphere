const Branch = require('../models/Branch.model')

exports.createBranch = async (req, res) => {
  try {
    const { name, skills } = req.body

    if (!name || !skills || !Array.isArray(skills)) {
      return res
        .status(400)
        .json({ message: 'Branch name and skills are required.' })
    }

    const newBranch = new Branch({
      name,
      skills,
    })

    const savedBranch = await newBranch.save()

    return res.status(201).json({
      message: 'Branch created successfully.',
      branch: savedBranch,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An error occurred while creating the branch.' })
  }
}
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().populate('skills')
    return res.status(200).json(branches)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An error occurred while fetching branches.' })
  }
}

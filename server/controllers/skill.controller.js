const Skill = require('../models/Skill.model')
exports.addSkill = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required.' })
    }

    const newSkill = new Skill({
      name,
      description,
    })

    const savedSkill = await newSkill.save()

    return res.status(201).json({
      message: 'Skill added successfully.',
      skill: savedSkill,
    })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An error occurred while adding the skill.' })
  }
}
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
    return res.status(200).json(skills)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An error occurred while fetching skills.' })
  }
}

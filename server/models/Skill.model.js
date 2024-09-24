const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
})

const Skill = mongoose.model('Skill', SkillSchema)

module.exports = Skill

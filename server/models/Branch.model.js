const mongoose = require('mongoose')

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  skills: [
    {
      // Array of skills for each branch
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill', // Reference to the Skill model
    },
  ],
})

const Branch = mongoose.model('Branch', BranchSchema)

module.exports = Branch

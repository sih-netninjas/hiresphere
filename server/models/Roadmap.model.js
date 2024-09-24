const mongoose = require('mongoose')
const RoadmapSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch', // Reference to the Branch model
      required: true,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill', // Reference to the Skill model
      required: true,
    },
    roadmap: [
      {
        chapter: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        referenceUrl: {
          type: String,
          trim: true,
        },
      },
    ],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    prerequisite: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

const Roadmap = mongoose.model('Roadmap', RoadmapSchema)

module.exports = Roadmap

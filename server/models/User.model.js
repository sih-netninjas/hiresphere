/**
 * NOTE by parv: i am assuming that the user may have multiple degrees.
 *  And thus i have kept it as an array.
 */
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    currentStatus: {
      type: String,
      enum: ['finding_job', 'learning', 'working'],
      required: true,
    },
    // Work
    workInfo: {
      company: {
        name: { type: String, trim: true },
        address: {
          city: { type: String, trim: true },
          state: { type: String, trim: true },
          zipCode: { type: String, trim: true },
        },
      },
      position: { type: String, trim: true },
      workExperience: { type: String, trim: true },
    },

    // Education
    education: {
      school: { type: String, trim: true },
      colleges: [
        {
          name: { type: String, trim: true },
          address: {
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            zipCode: { type: String, trim: true },
          },
          isCurrentlyStudying: {
            type: Boolean,
            default: false,
          },
          currentSemesterOrYear: {
            type: String,
            validate(value) {
              return this.isCurrentlyStudying ? value != null : true
            },
          },
          degreeType: {
            type: String,
            required: true,
          },
          branchId: {
            // Change this to branchId for clarity
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch', // Reference to the Branch model
            required: true,
          },
        },
      ],
    },

    cvUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
/*
Sample JSON (for postman :p )

{
  "uid": "123456",
  "username": "johnsmith",
  "email": "johnsmith@example.com",
  "address": {
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94105"
  },
  "currentStatus": "working",
  "workInfo": {
    "company": {
      "name": "Tech Innovations Inc.",
      "address": {
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94105"
      }
    },
    "position": "Software Engineer",
    "workExperience": "3 years"
  },
  "education": {
    "school": "Lincoln High School",
    "colleges": [
      {
        "name": "Community College",
        "address": {
          "city": "San Francisco",
          "state": "CA",
          "zipCode": "94107"
        },
        "isCurrentlyStudying": false,
        "currentSemesterOrYear": null,
        "degreeType": "Diploma",
        "branch": "Computer Science"
      },
      {
        "name": "University of California, Berkeley",
        "address": {
          "city": "Berkeley",
          "state": "CA",
          "zipCode": "94720"
        },
        "isCurrentlyStudying": false,
        "currentSemesterOrYear": null,
        "degreeType": "Bachelor's",
        "branch": "Software Engineering"
      }
    ]
  },
  "cvUrl": "http://example.com/johnsmith_cv.pdf"
}
*/

/*
  Cause.js
  --------
  Mongoose model for a possible cause of a phone problem.
  Each cause has a title, description and a list of fix steps
  that are shown to the user on the Results page.

  Causes are identified by the scoring engine which matches
  the user's answers against rules to find the most likely cause.
*/

const mongoose = require('mongoose')

// Schema for each individual fix step
const FixStepSchema = new mongoose.Schema({

  // The step number shown in the UI e.g. 1, 2, 3
  step: {
    type: Number,
    required: true
  },

  // Short title for this step e.g. "Restart your phone"
  title: {
    type: String,
    required: true
  },

  // Full detailed instruction shown below the title
  detail: {
    type: String,
    required: true
  }

})

// Main cause schema
const CauseSchema = new mongoose.Schema({

  // Unique identifier used in rules e.g. "network-outage"
  causeId: {
    type: String,
    required: true,
    unique: true
  },

  // Short title shown at the top of the Results page
  title: {
    type: String,
    required: true
  },

  // Longer description explaining the cause
  description: {
    type: String,
    required: true
  },

  // Ordered list of fix steps
  fixSteps: [FixStepSchema]

})

module.exports = mongoose.model('Cause', CauseSchema)
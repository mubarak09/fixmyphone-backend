/*
  Issue.js
  --------
  Mongoose model for an issue category.
  Each issue represents one of the five problem types
  a user can select on the Home page.

  Example: { id: "signal", label: "Mobile Signal" }
*/

const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({

  // Short unique identifier used in URLs e.g. "signal", "wifi"
  issueId: {
    type: String,
    required: true,
    unique: true
  },

  // Display name shown to the user e.g. "Mobile Signal"
  label: {
    type: String,
    required: true
  },

  // Short description shown on the category card
  description: {
    type: String,
    required: true
  },

  // Icon emoji shown on the category card
  icon: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('Issue', IssueSchema)
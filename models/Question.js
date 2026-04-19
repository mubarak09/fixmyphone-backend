/*
  Question.js
  -----------
  Mongoose model for a question in the Q&A flow.
  Each question belongs to one issue category and
  has a list of answer options the user can select.

  Some answer options have an "exits" flag which means
  selecting that answer ends the flow early with a
  Problem Solved screen.
*/

const mongoose = require('mongoose')

// Schema for each individual answer option
const OptionSchema = new mongoose.Schema({

  // Short identifier for this option e.g. "a", "b", "c"
  id: {
    type: String,
    required: true
  },

  // The text shown to the user e.g. "Yes and it fixed it"
  text: {
    type: String,
    required: true
  },

  // If true, selecting this option ends the flow early
  exits: {
    type: Boolean,
    default: false
  },

  // Description of what fixed the problem shown on the Solved screen
  // Only needed when exits is true
  fixDescription: {
    type: String,
    default: null
  }

})

// Main question schema
const QuestionSchema = new mongoose.Schema({

  // Which category this question belongs to e.g. "signal"
  issueId: {
    type: String,
    required: true
  },

  // Short identifier for this question e.g. "q1", "q2"
  questionId: {
    type: String,
    required: true
  },

  // The question text shown to the user
  text: {
    type: String,
    required: true
  },

  // The order this question appears in the flow
  order: {
    type: Number,
    required: true
  },

  // The list of answer options for this question
  options: [OptionSchema]

})

module.exports = mongoose.model('Question', QuestionSchema)
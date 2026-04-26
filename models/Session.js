/*
  Session.js
  ----------
  Mongoose model for a troubleshooting session.
  A session is created when a user completes the full
  Q&A flow and reaches the Results page.

  It stores everything about the session so the user
  can review what was tried and share it with a support
  agent if the issue is not resolved.
*/

const mongoose = require('mongoose')

// Schema for each individual answer given during the session
const AnswerSchema = new mongoose.Schema({

  // The question id e.g. "q1"
  questionId: {
    type: String,
    required: true
  },

  // The full question text
  questionText: {
    type: String,
    required: true
  },

  // The answer id e.g. "a"
  answerId: {
    type: String,
    required: true
  },

  // The full answer text
  answerText: {
    type: String,
    required: true
  }

})

// Schema for each fix step that was recommended
const FixStepSchema = new mongoose.Schema({
  step: { type: Number },
  title: { type: String },
  detail: { type: String }
})

// Main session schema
const SessionSchema = new mongoose.Schema({

  // Which category the user selected e.g. "signal"
  categoryId: {
    type: String,
    required: true
  },

  // The display label e.g. "Mobile Signal"
  categoryLabel: {
    type: String,
    required: true
  },

  // The most likely cause that was identified
  causeTitle: {
    type: String,
    required: true
  },

  // The cause description
  causeDescription: {
    type: String,
    required: true
  },

  // All the answers the user gave
  answers: [AnswerSchema],

  // The fix steps that were recommended
  fixSteps: [FixStepSchema],

  // When the session was created
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Session', SessionSchema)
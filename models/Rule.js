/*
  Rule.js
  -------
  Mongoose model for a scoring rule.
  Each rule links a specific answer to a cause and
  assigns a score. The scoring engine uses these rules
  to work out the most likely cause of a user's problem.

  Example: if the user answers "a" to question "q1" in
  the "signal" category, add 3 points to "network-outage"
*/

const mongoose = require('mongoose')

const RuleSchema = new mongoose.Schema({

  // Which category this rule applies to e.g. "signal"
  issueId: {
    type: String,
    required: true
  },

  // Which question this rule checks e.g. "q1"
  questionId: {
    type: String,
    required: true
  },

  // Which answer triggers this rule e.g. "a"
  answerId: {
    type: String,
    required: true
  },

  // Which cause gets the points e.g. "network-outage"
  causeId: {
    type: String,
    required: true
  },

  // How many points to add to that cause
  score: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Rule', RuleSchema)
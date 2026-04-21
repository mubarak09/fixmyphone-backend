/*
  SignalScenario.js
  -----------------
  Mongoose model for a simulated signal scenario.
  Each scenario represents a combination of user context
  inputs and maps them to a signal quality rating and
  a set of recommended fix steps.

  Example: a user who is indoors, has issues everywhere,
  is on 3G and has an active SIM maps to the scenario
  "weak indoor coverage" with a poor signal rating.
*/

const mongoose = require('mongoose')

const FixStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  detail: { type: String, required: true }
})

const SignalScenarioSchema = new mongoose.Schema({

  // Unique identifier for this scenario
  scenarioId: {
    type: String,
    required: true,
    unique: true
  },

  // Short title describing this scenario
  title: {
    type: String,
    required: true
  },

  // Plain English explanation of what is causing the signal issue
  explanation: {
    type: String,
    required: true
  },

  // Signal strength rating: "good", "fair", "poor", "no-signal"
  signalRating: {
    type: String,
    required: true,
    enum: ['good', 'fair', 'poor', 'no-signal']
  },

  // The context conditions that trigger this scenario
  conditions: {
    locationType: { type: String, default: null },
    issueFrequency: { type: String, default: null },
    networkMode: { type: String, default: null },
    simStatus: { type: String, default: null }
  },

  // Ordered fix steps for this scenario
  fixSteps: [FixStepSchema]

})

module.exports = mongoose.model('SignalScenario', SignalScenarioSchema)
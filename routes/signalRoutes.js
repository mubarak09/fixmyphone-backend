/*
  signalRoutes.js
  ---------------
  Defines the API route for the Signal Troubleshooter.
  Receives the user's connectivity context and returns
  the most relevant simulated signal scenario.
*/

const express = require('express')
const router = express.Router()
const signalController = require('../controllers/signalController')

// POST /api/signal
// Accepts user context and returns the best matching scenario
router.post('/', signalController.getSignalScenario)

module.exports = router
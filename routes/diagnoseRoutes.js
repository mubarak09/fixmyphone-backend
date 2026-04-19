/*
  diagnoseRoutes.js
  -----------------
  Defines the API route for running the diagnosis.
  This route receives the user's answers, runs the
  scoring engine and returns the most likely cause
  with its fix steps.
*/

const express = require('express')
const router = express.Router()
const diagnoseController = require('../controllers/diagnoseController')

// POST /api/diagnose
// Accepts the user's answers and returns the top cause
router.post('/', diagnoseController.diagnoseIssue)

module.exports = router
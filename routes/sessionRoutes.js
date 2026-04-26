/*
  sessionRoutes.js
  ----------------
  Defines the API routes for saving and retrieving
  troubleshooting sessions.
*/

const express = require('express')
const router = express.Router()
const sessionController = require('../controllers/sessionController')

// POST /api/sessions
// Saves a completed troubleshooting session to the database
router.post('/', sessionController.saveSession)

// GET /api/sessions/:sessionId
// Retrieves a specific session by its id
router.get('/:sessionId', sessionController.getSession)

module.exports = router
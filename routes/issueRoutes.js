/*
  issueRoutes.js
  --------------
  Defines the API routes related to issue categories.
  These routes are used by the frontend to load the
  five category cards shown on the Home page.
*/

const express = require('express')
const router = express.Router()
const issueController = require('../controllers/issueController')

// GET /api/issues
// Returns all issue categories from the database
router.get('/', issueController.getAllIssues)

module.exports = router
/*
  questionRoutes.js
  -----------------
  Defines the API routes related to questions.
  These routes are used by the frontend to load
  the questions for a selected issue category.
*/

const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')

// GET /api/questions/:issueId
// Returns all questions for a specific issue category
// e.g. GET /api/questions/signal
router.get('/:issueId', questionController.getQuestionsByIssue)

module.exports = router
/*
  questionController.js
  ---------------------
  Handles the logic for question related requests.
  Fetches questions from the database for a specific
  issue category and returns them sorted by order.
*/

const Question = require('../models/Question')

/*
  getQuestionsByIssue
  -------------------
  Fetches all questions for a given issue category.
  The issueId comes from the URL parameter.
  Questions are sorted by their order field so they
  appear in the correct sequence in the Q&A flow.
*/
const getQuestionsByIssue = async (req, res) => {
  try {
    // Get the issueId from the URL e.g. /api/questions/signal
    const { issueId } = req.params

    // Find all questions for this category sorted by order
    const questions = await Question.find({ issueId }).sort({ order: 1 })

    // If no questions found return a 404 error
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this category' })
    }

    res.json(questions)
  } catch (error) {
    console.log('Error fetching questions:', error)
    res.status(500).json({ message: 'Error fetching questions' })
  }
}

module.exports = { getQuestionsByIssue }
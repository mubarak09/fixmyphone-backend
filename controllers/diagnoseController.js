/*
  diagnoseController.js
  ---------------------
  Handles the logic for the diagnosis request.
  This is the core of the backend - it receives the
  user's answers, runs the scoring engine against the
  rules in the database and returns the top cause
  with its fix steps.
*/

const Rule = require('../models/Rule')
const Cause = require('../models/Cause')

/*
  diagnoseIssue
  -------------
  Receives the categoryId and answers array from the
  frontend, scores each possible cause using the rules
  in the database and returns the highest scoring cause.

  Expected request body:
  {
    categoryId: "signal",
    answers: [
      { questionId: "q1", answerId: "a" },
      { questionId: "q2", answerId: "b" }
    ]
  }
*/
const diagnoseIssue = async (req, res) => {
  try {
    const { categoryId, answers } = req.body

    // Validate that we received the required data
    if (!categoryId || !answers || answers.length === 0) {
      return res.status(400).json({ message: 'categoryId and answers are required' })
    }

    // Fetch all rules for this category from the database
    const rules = await Rule.find({ issueId: categoryId })

    // Create an empty scores object to track points per cause
    const scores = {}

    // Loop through every rule and check if it matches any answer
    rules.forEach((rule) => {

      // Check if the user gave the answer this rule is looking for
      const matchingAnswer = answers.find(
        (answer) =>
          answer.questionId === rule.questionId &&
          answer.answerId === rule.answerId
      )

      // If the answer matches add the score to that cause
      if (matchingAnswer) {
        if (scores[rule.causeId]) {
          scores[rule.causeId] += rule.score
        } else {
          scores[rule.causeId] = rule.score
        }
      }
    })

    // Sort the causes by score descending to find the top cause
    const sortedCauses = Object.entries(scores).sort((a, b) => b[1] - a[1])

    // If no causes were matched return a not found response
    if (sortedCauses.length === 0) {
      return res.status(404).json({ message: 'No cause could be determined' })
    }

    // Get the top cause id
    const topCauseId = sortedCauses[0][0]

    // Look up the full cause details from the database
    const topCause = await Cause.findOne({ causeId: topCauseId })

    if (!topCause) {
      return res.status(404).json({ message: 'Cause details not found' })
    }

    // Return the top cause with its fix steps
    res.json(topCause)

  } catch (error) {
    console.log('Error running diagnosis:', error)
    res.status(500).json({ message: 'Error running diagnosis' })
  }
}

module.exports = { diagnoseIssue }
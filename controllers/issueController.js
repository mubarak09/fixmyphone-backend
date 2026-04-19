/*
  issueController.js
  ------------------
  Handles the logic for issue category related requests.
  Controllers receive the request, talk to the database
  and send back the response.
*/

const Issue = require('../models/Issue')

/*
  getAllIssues
  -----------
  Fetches all issue categories from the database
  and returns them as a JSON array.
*/
const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({})
    res.json(issues)
  } catch (error) {
    console.log('Error fetching issues:', error)
    res.status(500).json({ message: 'Error fetching issues' })
  }
}

module.exports = { getAllIssues }
/*
  sessionController.js
  --------------------
  Handles saving and retrieving troubleshooting sessions.

  When a user completes the Q&A flow and sees their results,
  a session is automatically saved to MongoDB. The session
  contains all the answers they gave and the fix steps that
  were recommended. This allows the user to review and share
  a summary if they need to contact support.
*/

const Session = require('../models/Session')

/*
  saveSession
  -----------
  Saves a completed troubleshooting session to the database
  and returns the saved session including its generated id.
*/
const saveSession = async (req, res) => {
  try {
    const {
      categoryId,
      categoryLabel,
      causeTitle,
      causeDescription,
      answers,
      fixSteps
    } = req.body

    // Validate that we have the required fields
    if (!categoryId || !categoryLabel || !causeTitle || !answers) {
      return res.status(400).json({ message: 'Missing required session data' })
    }

    // Create and save the new session
    const newSession = new Session({
      categoryId,
      categoryLabel,
      causeTitle,
      causeDescription,
      answers,
      fixSteps
    })

    const savedSession = await newSession.save()

    res.status(201).json(savedSession)

  } catch (error) {
    console.log('Error saving session:', error)
    res.status(500).json({ message: 'Error saving session' })
  }
}

/*
  getSession
  ----------
  Retrieves a specific session from the database by its id.
  Used when a user wants to view their saved summary.
*/
const getSession = async (req, res) => {
  try {
    const { sessionId } = req.params

    const session = await Session.findById(sessionId)

    if (!session) {
      return res.status(404).json({ message: 'Session not found' })
    }

    res.json(session)

  } catch (error) {
    console.log('Error retrieving session:', error)
    res.status(500).json({ message: 'Error retrieving session' })
  }
}

module.exports = { saveSession, getSession }
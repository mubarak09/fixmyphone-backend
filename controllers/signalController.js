/*
  signalController.js
  -------------------
  Handles the logic for the Signal Troubleshooter.

  It receives four pieces of context from the user:
  - locationType: "indoors" or "outdoors"
  - issueFrequency: "everywhere", "one-location" or "intermittent"
  - networkMode: "4g", "3g", "5g" or "unsure"
  - simStatus: "active" or "inactive"

  It then scores each scenario against the user's context
  and returns the best matching one.
*/

const SignalScenario = require('../models/SignalScenario')

/*
  getSignalScenario
  -----------------
  Scores all signal scenarios against the user's context
  and returns the highest scoring match.
*/
const getSignalScenario = async (req, res) => {
  try {
    const { locationType, issueFrequency, networkMode, simStatus } = req.body

    // Validate that we received the required data
    if (!issueFrequency || !simStatus) {
      return res.status(400).json({ message: 'issueFrequency and simStatus are required' })
    }

    // Fetch all signal scenarios from the database
    const scenarios = await SignalScenario.find({})

    // Score each scenario based on how well it matches the user's context
    const scoredScenarios = scenarios.map((scenario) => {
      let score = 0
      const conditions = scenario.conditions

      // Matching a specific condition adds points
      // Not matching a specific condition subtracts points
      // Null conditions are neutral and neither add nor subtract

      if (conditions.locationType !== null) {
        if (conditions.locationType === locationType) score += 2
        else score -= 2
      }

      if (conditions.issueFrequency !== null) {
        if (conditions.issueFrequency === issueFrequency) score += 2
        else score -= 2
      }

      if (conditions.networkMode !== null) {
        if (conditions.networkMode === networkMode) score += 3
        else score -= 3
      }

      if (conditions.simStatus !== null) {
        if (conditions.simStatus === simStatus) score += 2
        else score -= 2
      }

      return { scenario, score }
    })

    // Sort by score descending to find the best match
    scoredScenarios.sort((a, b) => b.score - a.score)

    // Return the highest scoring scenario
    const bestMatch = scoredScenarios[0].scenario

    res.json(bestMatch)

  } catch (error) {
    console.log('Error getting signal scenario:', error)
    res.status(500).json({ message: 'Error getting signal scenario' })
  }
}

module.exports = { getSignalScenario }
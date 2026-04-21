/*
  server.js
  ---------
  The main entry point for the FixMyPhone backend.
  This file sets up the Express server, connects to
  MongoDB and registers all the API routes.
*/

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db')

// Load environment variables from .env file
dotenv.config()

const app = express()

// Allow requests from the React frontend
app.use(cors())

// Allow the server to read JSON request bodies
app.use(express.json())

// Connect to MongoDB Atlas
connectDB()

// Import all route files
const issueRoutes = require('./routes/issueRoutes')
const questionRoutes = require('./routes/questionRoutes')
const diagnoseRoutes = require('./routes/diagnoseRoutes')
const signalRoutes = require('./routes/signalRoutes')

// Register routes with their base paths
app.use('/api/issues', issueRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/diagnose', diagnoseRoutes)
app.use('/api/signal', signalRoutes)

// Health check route to confirm the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FixMyPhone API is running' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FixMyPhone API is running' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
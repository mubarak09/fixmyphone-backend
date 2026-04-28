# FixMyPhone — Backend API

The Node.js and Express backend API for the FixMyPhone mobile 
troubleshooting assistant. Provides REST API endpoints for fetching 
issues, questions, running the scoring engine and saving sessions.

**Live API:** https://fixmyphone-backend-pa91.onrender.com  
**Frontend Repository:** https://github.com/mubarak09/fixmyphone-frontend

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check — confirms API is running |
| GET | `/api/issues` | Returns all issue categories |
| GET | `/api/questions/:issueId` | Returns questions for a category |
| POST | `/api/diagnose` | Runs scoring engine, returns top cause |
| POST | `/api/signal` | Returns best matching signal scenario |
| POST | `/api/sessions` | Saves a completed session |
| GET | `/api/sessions/:sessionId` | Retrieves a saved session |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework and routing |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modelling |


---

## Project Structure

fixmyphone-backend/
├── src/
│   ├── controllers/
│   │   ├── issueController.js
│   │   ├── questionController.js
│   │   ├── diagnoseController.js
│   │   ├── signalController.js
│   │   └── sessionController.js
│   ├── models/
│   │   ├── Issue.js
│   │   ├── Question.js
│   │   ├── Session.js
│   │   └── SignalScenario.js
│   ├── routes/
│   │   ├── issues.js
│   │   ├── questions.js
│   │   ├── diagnose.js
│   │   ├── signal.js
│   │   └── sessions.js
│   ├── utils/
│   │   ├── scoringEngine.js
│   │   └── signalMatcher.js
│   ├── config/
│   │   └── database.js
│   └── server.js
├── .env
├── package.json
└── README.md

---

## Running locally

### Prerequisites
- Node.js v18 or higher
- A MongoDB Atlas account and cluster

### Steps

1. Clone the repository
```
git clone https://github.com/mubarak09/fixmyphone-backend.git
cd fixmyphone-backend
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root folder
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fixmyphone?retryWrites=true&w=majority
PORT=5000
```
4. Seed the database with initial data
```bash
node data/seed.js
```

5. Start the development server
```bash
npm run dev
```

6. Test the API is running by visiting
```
http://localhost:5000/api/health
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Port the server runs on (default 5000) |

## Database Collections

| Collection | Documents | Description |
|---|---|---|
| issues | 5 | Issue category definitions |
| questions | 25 | Q&A questions per category |
| causes | 18 | Possible causes with fix steps |
| rules | 60 | Scoring rules linking answers to causes |
| signalscenarios | 8 | Simulated signal scenarios |
| sessions | dynamic | Saved user troubleshooting sessions |

---

## Acknowledgements

This project was developed as part of the Final Year Project module at 
South East Technological University Waterford, 2025-26.
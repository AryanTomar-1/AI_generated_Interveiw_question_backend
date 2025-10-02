# Swipe AI Backend

A Node.js backend application for the Swipe AI Interview system, built with Express.js and MongoDB. This backend provides APIs for managing candidates, generating AI-powered interview questions, and conducting candidate reviews using grok-4-fast:free.

## Features

- **Candidate Management**: CRUD operations for interview candidates
- **AI Question Generation**: Generate interview questions using AI models
- **Candidate Reviews**: Automated review generation for candidates
- **Search Functionality**: Search candidates by name or email
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI Libraries**: x-ai/grok-4-fast:free
- **Other**: CORS, dotenv, Axios, Nodemon

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd swipe_ai_interview/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=5000
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Ensure MongoDB is running locally on port 27017.

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

### Candidates

- **GET /api/candidates/all**
  - Get all candidates
  - Response: Array of candidate objects with id, name, email, score

- **GET /api/candidates/:email**
  - Get candidate details by email
  - Response: Candidate object with name, email, questions, totalScore, summary

- **GET /api/candidates/search/:query**
  - Search candidates by name or email
  - Response: Array of matching candidates

### Questions

- **GET /api/questions/ai_generated**
  - Generate AI-powered interview questions
  - Response: Generated questions

- **POST /api/questions/review**
  - Generate candidate review
  - Body: Candidate data
  - Response: Review object

## Database

- **Database Name**: dbname
- **Connection**: MongoDB://localhost:27017/dbname
- **Models**: Candidate (defined in models/Candidate.js)

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── candidateController.js
│   ├── questionsController.js
│   └── reviewController.js
├── models/
│   └── Candidate.js
├── routes/
│   ├── candidateRoute.js
│   └── questions.js
├── service/
│   └── candidateServices.js
├── index.js               # Entry point
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

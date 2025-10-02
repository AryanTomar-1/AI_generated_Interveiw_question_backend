import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    questions: [
      {
        question: { type: String, required: true },
        studentAnswer: { type: String, default: "" },
        correctAnswer: { type: String, default: "" },
      },
    ],
    totalScore: { type: Number, default: 0 },
    summary: { type: String, default: "" },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", CandidateSchema);

export default Candidate;

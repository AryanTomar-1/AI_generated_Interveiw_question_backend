import Candidate from "../models/Candidate.js";
/**
 * Create a new candidate or update existing one
 */
export const saveCandidate = async (candidateData) => {
    const { name, email, questions, totalScore, summary } = candidateData;
    if (!name || !email) {
        throw new Error("Name and Email are required");
    }
    const candidate = new Candidate({
        name,
        email,
        questions,
        totalScore,
        summary,
    });
    return await candidate.save();
};

/**
 * Get all candidates (for dashboard)
 */
export const allCandidates = async () => {
    return await Candidate.find()
    .select("name email totalScore")
    .sort({ createdAt: -1 });
};

/**
 * Get candidate by email
 */
export const getCandidateByEmail = async (email) => {
    return await Candidate.findOne({ email });
};

// filepath: c:\Users\Acer\OneDrive\Desktop\Projects\swipe_ai_interview\backend\service\candidateServices.js
export const searchCandidates = async (query) => {
  // Case-insensitive prefix match for name or email
  return await Candidate.find({
    $or: [
      { name: { $regex: `^${query}`, $options: "i" } },
      { email: { $regex: `^${query}`, $options: "i" } },
    ],
  }).select("name email totalScore").sort({ createdAt: -1 });
};

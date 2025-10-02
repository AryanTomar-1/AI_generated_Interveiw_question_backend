import { allCandidates, getCandidateByEmail, searchCandidates } from "../service/candidateServices.js";

export const getAllCandidates = async (req, res) => {
    try {
        const candidates = await allCandidates();

        // Format response
        const listOfCandidate = candidates.map(c => ({
            id: c._id,
            name: c.name,
            email: c.email,
            score: c.totalScore,
        }));

        res.status(200).json(listOfCandidate);
    } catch (err) {
        console.error("Error fetching candidates:", err);
        res.status(500).json({ message: "Server error fetching candidates" });
    }
};

export const getCandidateUsingEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const candidate = await getCandidateByEmail(email);
        const detail = {
            name: candidate.name,
            email: candidate.email,
            questions: candidate.questions,
            totalScore: candidate.totalScore,
            summary: candidate.summary,
        }
        return res.status(200).json(detail);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error fetching candidate details" });
    }

}

export const search = async (req, res) => {
    const { query } = req.params;
    console.log("Search query:", query);
    if (!query || query.trim().length < 1) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const candidates = await searchCandidates(query);
        const listOfCandidate = candidates.map(c => ({
            id: c._id,
            name: c.name,
            email: c.email,
            score: c.totalScore,
        }));
        res.status(200).json(listOfCandidate);
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ error: "Search failed" });
    }
}

import axios from "axios";
import { saveCandidate} 
  from "../service/candidateServices.js";
/**
 * Controller: Generate candidate review using AI
 * API: POST /api/review
 */
export const generateCandidateReview = async (req, res) => {
    const { candidateName,candidateEmail, questions, answers, candidateAnswers } = req.body;

    // Basic validation
    if (!candidateName || !questions || !answers || !candidateAnswers || !candidateEmail) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (
        !Array.isArray(questions) ||
        !Array.isArray(answers) ||
        !Array.isArray(candidateAnswers)
    ) {
        return res.status(400).json({ error: "Questions, answers, and candidateAnswers must be arrays" });
    }
    const questionWithAnswers=[]
    try {
        // Build evaluation table for the AI prompt
        const qaPairs = questions.map((q, idx) => {
            const qu={
                question:q,
                studentAnswer:candidateAnswers[idx] || "No Answer",
                correctAnswer:answers[idx]
            }
            questionWithAnswers.push(qu);
            return `Q${idx + 1}: ${q}
            Correct Answer: ${answers[idx]}
            Candidate Answer: ${candidateAnswers[idx] || "No Answer"}\n`;
        }).join("\n");

        // AI prompt
        const prompt = `
        You are an experienced technical interviewer.
        Candidate Name: ${candidateName}
        Here is the test data:
        ${qaPairs}
Return JSON with:
    - score
    - percentage
    - performance ("Excellent", "Good", "Needs Improvement")
    - short_feedback (2 lines max).
    `;

        // Call AI (OpenRouter example)
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "x-ai/grok-4-fast:free", // you can change model
                messages: [
                    { role: "system", content: "You are a professional HR recruiter." },
                    { role: "user", content: prompt }
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Extract AI response
        const rawOutput = response.data.choices[0].message.content;

        let reviewData;
        try {
            reviewData = JSON.parse(rawOutput);
        } catch (err) {
            // fallback if JSON parse fails
            reviewData = { score: "N/A", summary: rawOutput };
        }
        // Send final response
        const candidateData={
            name:candidateName,
            email:candidateEmail,
            questions:questionWithAnswers,
            totalScore:reviewData.score,
            summary:reviewData.short_feedback
        };
        await saveCandidate(candidateData);
        res.json({
            candidateName,
            review: reviewData,
        });

    } catch (error) {
        console.log(error);
        console.error("AI Review Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate candidate review." });
    }
};

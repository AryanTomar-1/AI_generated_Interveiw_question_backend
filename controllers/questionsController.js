import axios from "axios";
import 'dotenv/config';

export async function generateQuestions(req, res) {
  try {
    const prompt = `
      Generate 6 multiple-choice questions for a Full Stack Developer (React + Node) role.
      - 2 Easy, 2 Medium, 2 Hard
      - Each question must have 4 options (A-D) and indicate the correct answer
      - Include a time limit: Easy 20s, Medium 60s, Hard 120s
      Respond in valid JSON like:
      [
        {
          "question": "...",
          "options": ["A", "B", "C", "D"],
          "answer": "B",
          "difficulty": "easy|medium|hard",
          "timeLimit": 20|60|120
        }
      ]
    `;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "x-ai/grok-4-fast:free",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // The AI response text
    const aiText = response.data.choices[0].message.content;
    const questions = JSON.parse(aiText); // convert JSON string to object
    res.json({ questions });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

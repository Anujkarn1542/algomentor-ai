const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeCode = async ({ code, language, topic, problemTitle }) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const prompt = `
You are an expert DSA coach. Analyze the following ${language} code solution for the problem "${problemTitle}" (topic: ${topic}).

CODE:
\`\`\`${language}
${code}
\`\`\`

Respond ONLY with a valid JSON object in this exact format, no markdown, no explanation outside JSON:
{
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "complexityExplanation": "brief explanation of why",
  "pattern": ["pattern1", "pattern2"],
  "score": <number 0-100>,
  "isOptimal": <true or false>,
  "hints": [
    "Socratic hint 1 — guide without giving answer",
    "Socratic hint 2 — next level hint",
    "Socratic hint 3 — strongest hint, still no direct answer"
  ],
  "optimizedCode": "the optimized version of the code as a string",
  "optimizedTimeComplexity": "O(...)",
  "optimizedSpaceComplexity": "O(...)",
  "improvements": ["improvement point 1", "improvement point 2"]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

module.exports = { analyzeCode };

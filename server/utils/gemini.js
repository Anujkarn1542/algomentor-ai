const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeCode = async ({ code, language, topic, problemTitle }) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
You are an expert DSA coach. Analyze the following ${language} code solution for the problem "${problemTitle}" (topic: ${topic}).

CODE:
\`\`\`${language}
${code}
\`\`\`

Respond ONLY with a valid JSON object:
{
  "timeComplexity": "O(...)",
  "spaceComplexity": "O(...)",
  "complexityExplanation": "brief explanation",
  "pattern": ["pattern1", "pattern2"],
  "score": 85,
  "isOptimal": true,
  "hints": ["hint1", "hint2", "hint3"],
  "optimizedCode": "optimized code",
  "optimizedTimeComplexity": "O(...)",
  "optimizedSpaceComplexity": "O(...)",
  "improvements": ["point1", "point2"]
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

const generateRoadmapAI = async ({ weakTopic, topicStats, duration }) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
Create a personalized ${duration}-day DSA roadmap.

Weak topic: ${weakTopic}
Topic stats: ${JSON.stringify(topicStats)}

Respond ONLY with a valid JSON array:
[
  {
    "day": "Day 1",
    "focus": "Arrays",
    "tasks": ["task 1", "task 2"],
    "goal": "goal text"
  }
]
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const clean = text.replace(/```json|```/g, "").trim();

  const start = clean.indexOf("[");
  const end = clean.lastIndexOf("]");

  return JSON.parse(clean.slice(start, end + 1));
};

module.exports = {
  analyzeCode,
  generateRoadmapAI,
};

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.startInterview = async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are a professional DSA technical interviewer.

Ask ONE coding interview question from topic "${topic}"
with "${difficulty}" difficulty.

After that ask one conceptual follow-up question.

Keep the tone realistic like FAANG interviews.
`;

    const result = await model.generateContent(prompt);

    res.json({
      question: result.response.text(),
    });
  } catch (error) {
    console.error("INTERVIEW START ERROR:", error);
    res.status(500).json({
      message: "Failed to start interview",
    });
  }
};

exports.continueInterview = async (req, res) => {
  try {
    const { previousQuestion, userAnswer } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are a DSA interviewer.

Previous question:
${previousQuestion}

Candidate answer:
${userAnswer}

First give short feedback in 2-3 lines.

Then ask next follow-up interview question.

Keep response interview style.
`;

    const result = await model.generateContent(prompt);

    res.json({
      response: result.response.text(),
    });
  } catch (error) {
    console.error("INTERVIEW CONTINUE ERROR:", error);
    res.status(500).json({
      message: "Failed to continue interview",
    });
  }
};

exports.generateInterviewReport = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        message: "Interview messages are required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const conversation = messages
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n\n");

    const prompt = `
You are an expert DSA interview evaluator.

Analyze this full mock interview conversation.

Return ONLY valid JSON in this exact format:

{
  "approach": 8,
  "optimization": 7,
  "communication": 8,
  "confidence": 8,
  "overall": 78,
  "suggestions": [
    "point 1",
    "point 2",
    "point 3"
  ]
}

Conversation:
${conversation}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, "").trim();

    const report = JSON.parse(clean);

    res.json(report);
  } catch (error) {
    console.error("INTERVIEW REPORT ERROR:", error);

    if (error.status === 429) {
      return res.status(429).json({
        message: "AI quota reached. Please try later.",
      });
    }

    res.status(500).json({
      message: "Failed to generate report",
    });
  }
};

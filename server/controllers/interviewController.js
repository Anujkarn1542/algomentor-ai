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

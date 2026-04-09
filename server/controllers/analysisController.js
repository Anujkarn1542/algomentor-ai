const Analysis = require("../models/Analysis");
const User = require("../models/User");
const {
  getXPByDifficulty,
  calculateLevel,
  updateStreak,
} = require("../services/gamificationService");
const {
  analyzeCode,
  generateRoadmapAI,
} = require("../utils/gemini");


exports.analyze = async (req, res) => {
  const { problemTitle, code, language, topic, difficulty } = req.body;

  if (!problemTitle || !code || !topic)
    return res
      .status(400)
      .json({ message: "Problem title, code and topic are required" });

  try {
    const aiResult = await analyzeCode({ code, language, topic, problemTitle });

    const analysis = await Analysis.create({
      user: req.user._id,
      problemTitle,
      code,
      language,
      topic,
      difficulty: difficulty || "Medium",
      timeComplexity: aiResult.timeComplexity,
      spaceComplexity: aiResult.spaceComplexity,
      pattern: aiResult.pattern,
      hints: aiResult.hints,
      optimizedCode: aiResult.optimizedCode,
      score: aiResult.score,
    });

    // 🏆 Update user XP + level + streak
    const user = await User.findById(req.user._id);

    const earnedXP = getXPByDifficulty(difficulty || "Medium");

    user.xp += earnedXP;

    updateStreak(user);

    user.level = calculateLevel(user.xp);

    await user.save();

    res.status(201).json({
      analysis,
      aiResult,
      gamification: {
        earnedXP,
        totalXP: user.xp,
        level: user.level,
        streak: user.streak,
      },
    });
  } catch (err) {
    console.error("FULL ERROR:", err);
    console.error("MESSAGE:", err.message);

    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

exports.getHistory = async (req, res) => {
  const analyses = await Analysis.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(analyses);
};

exports.generateRoadmap = async (req, res) => {
  const { weakTopic, topicStats, duration } = req.body;

  try {
    const roadmap = await generateRoadmapAI({
      weakTopic,
      topicStats,
      duration,
    });

    res.json(roadmap);
  } catch (err) {
    console.error("ROADMAP ERROR:", err);
    res.status(500).json({
      message: err.message || "Failed to generate roadmap",
    });
  }
};

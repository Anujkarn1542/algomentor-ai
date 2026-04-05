const Analysis = require("../models/Analysis");

exports.getStats = async (req, res) => {
  const userId = req.user._id;

  const total = await Analysis.countDocuments({ user: userId });

  const topicStats = await Analysis.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$topic",
        count: { $sum: 1 },
        avgScore: { $avg: "$score" },
      },
    },
    { $sort: { count: -1 } },
  ]);

  const recent = await Analysis.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("problemTitle topic difficulty timeComplexity createdAt");

  const weakTopic = topicStats.reduce(
    (prev, curr) =>
      curr.avgScore < (prev?.avgScore ?? Infinity) ? curr : prev,
    null,
  );

  const avgScore = topicStats.length
    ? Math.round(
        topicStats.reduce((s, t) => s + t.avgScore, 0) / topicStats.length,
      )
    : 0;

  res.json({
    total,
    topicStats,
    recent,
    weakTopic: weakTopic?._id || "N/A",
    avgScore,
  });
};

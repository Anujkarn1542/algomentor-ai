const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🏆 Get top 20 users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("name xp level streak avatar")
      .sort({ xp: -1 })
      .limit(20);

    const rankedUsers = users.map((user, index) => ({
      rank: index + 1,
      ...user.toObject(),
    }));

    res.json(rankedUsers);
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch leaderboard",
    });
  }
});

module.exports = router;

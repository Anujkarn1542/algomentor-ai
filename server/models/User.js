const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },

    // 🏆 Gamification fields
    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    streak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    lastActiveDate: {
      type: Date,
      default: null,
    },

    badges: [
      {
        name: String,
        icon: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

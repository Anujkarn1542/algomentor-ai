// 🏆 XP based on difficulty
const getXPByDifficulty = (difficulty) => {
  const xpMap = {
    Easy: 25,
    Medium: 50,
    Hard: 100,
  };

  return xpMap[difficulty] || 25;
};

// 📈 Calculate level from XP
const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

// 🔥 Update daily streak
const updateStreak = (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = user.lastActiveDate ? new Date(user.lastActiveDate) : null;

  if (lastDate) {
    lastDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // same day → do nothing
      return;
    }

    if (diffDays === 1) {
      user.streak += 1;
    } else {
      user.streak = 1;
    }
  } else {
    user.streak = 1;
  }

  user.lastActiveDate = new Date();

  if (user.streak > user.longestStreak) {
    user.longestStreak = user.streak;
  }
};

module.exports = {
  getXPByDifficulty,
  calculateLevel,
  updateStreak,
};

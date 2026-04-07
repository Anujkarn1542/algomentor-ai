const express = require("express");
const router = express.Router();
const passport = require("../utils/passport");
const { register, login } = require("../controllers/authController");

// existing routes
router.post("/register", register);
router.post("/login", login);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login?error=true`,
    },
    (err, data) => {
      if (err || !data) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
      }

      const { user, token } = data;

      const encodedUser = encodeURIComponent(
        JSON.stringify({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          token,
        }),
      );

      res.redirect(
        `${process.env.CLIENT_URL}/auth/callback?user=${encodedUser}`,
      );
    },
  )(req, res, next);
});

module.exports = router;
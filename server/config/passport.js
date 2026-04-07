const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user exists with googleId
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // check if email already registered
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // link google to existing account
            user.googleId = profile.id;
            user.avatar = profile.photos[0]?.value;
            await user.save();
          } else {
            // create new user
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos[0]?.value,
              password: Math.random().toString(36),
            });
          }
        }

        const token = generateToken(user._id);
        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;

const passport = require('passport');
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('Users');

passport.serializeUser((User, done) => {
  done(null, User.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);
      const existingUser = await User.findOne({ userID: profile.id })
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ userID: profile.id }).save()
      done(null, existingUser)
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: keys.linkedinClientID,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: "/auth/linkedin/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);
      const existingUser = await User.findOne({ userID: profile.id })
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ userID: profile.id }).save()
      done(null, existingUser)
    }
  )
);
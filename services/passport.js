const passport = require("passport");
const mongoose = require('mongoose')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require("../config/keys");
const User = mongoose.model('Users');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);
      User.findOne({ id: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // do nothing as the user already exists
          }
          else {
            //user id not present. Create a new user with this id
            new User({ id: profile.id }).save();
          }
        })
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: keys.linkedinClientID,
      clientSecret: keys.linkedinClientSecret,
      callbackURL: "/auth/linkedin/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile", profile);
      User.findOne({ id: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            // do nothing as the user already exists
          }
          else {
            //user id not present. Create a new user with this id
            new User({ id: profile.id }).save();
          }
        })
    }
  )
);
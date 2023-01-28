const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

connectDB();
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    option: "http://localhost:3000",
    credentials: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    function (accessToken, refreshToken, profile, cb) {
      //if use mongoDB
      // const user = {
      //   username: profile.displayName,
      //   avatar: profile.photo[0],
      // }
      // User.create({})
    }
  )
);

//serializeUser and deserializeUser to pass session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.listen("5000", () => {
  console.log("Server is running");
});

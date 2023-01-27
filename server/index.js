const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const colors = require("colors");
const passport = require("passport");
const cookieSession = require("cookie-session");

connectDB();
app.use(
  cookieSession({
    name: "session",
    keys: ["cs-secret"],
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
app.listen("5000", () => {
  console.log("Server is running");
});

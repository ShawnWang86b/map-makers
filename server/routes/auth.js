const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "http://localhost:3000";
//google login can use get method
//if you using username and password, you can use post method
router.get("/google", passport.authenticate("google", { scope: [profile] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

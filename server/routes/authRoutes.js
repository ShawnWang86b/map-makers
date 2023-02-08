const router = require("express").Router();
const passport = require("passport");
const authController = require("../controller/auth");
const CLIENT_URL = "http://localhost:3000";

//sign up
router.post("/register", authController.register);
//login
router.post("/login", authController.login);
//refresh
router.get("/refresh", authController.refresh);
//logout
router.post("/logout", authController.logout);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //cookies:req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

//google login can use get method
//if you using username and password, you can use post method
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

//github login
router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;

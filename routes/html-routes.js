const path = require("path");
const router = require('express').Router();

  //IMAGE ROUTES
  router.get("/backgroundimage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/members");
  // }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/members");
  // }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", (req, res) => {
  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/members");
  // }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/members", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/members.html"));
});

//IMAGE ROUTES
router.get("/backgroundimage", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

module.exports = router;

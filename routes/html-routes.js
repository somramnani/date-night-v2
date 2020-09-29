
const path = require("path");
const router = require('express').Router();

//HTML Routes
module.exports = function (app) {
  path.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  path.get("/results", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

  path.get("/styles", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
  });
 

  //IMAGE ROUTES
  path.get("/backgroundimage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });

  path.get("/fireworks", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/fireworks.jpg"));
  });

  path.get("/datenight", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });
};


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


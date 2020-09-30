const path = require("path");
const router = require("express").Router();

//HTML Routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/results", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/search-results.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/styles", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
});

// Image Routes
router.get("/backgroundimage", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

router.get("/fireworks", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/fireworks.jpg"));
});

router.get("/datenight", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

router.get("/concert", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/concert.jpg"));
});

module.exports = router;

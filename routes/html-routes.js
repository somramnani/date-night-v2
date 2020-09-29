const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/results", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/results.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/styles", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
});

router.get("/backgroundimage", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});
router.get("/fireworks", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/fireworks.jpg"));
});

router.get("/datenight", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

module.exports = router;

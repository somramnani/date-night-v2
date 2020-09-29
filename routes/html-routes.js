const path = require("path");
const router = require("express").Router();

  //IMAGE ROUTES
router.get("/backgroundimage", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

router.get("/styles", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
});

//IMAGE ROUTES
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

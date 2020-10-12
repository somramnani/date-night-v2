const path = require("path");
const router = require("express").Router();
const secured = require("../lib/middleware/secured");

//HTML Routes

router.get("/", (req, res) => {
  res.render("main", { layout: "index" });
});

router.get("/results", (req, res) => {
  res.render("search-results", { layout: "index" });
});

router.get("/profile", (req, res) => {
  res.render("profile", { layout: "index" });
});

router.get("/styles", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
});

router.get("/scripts", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/js/scripts.js"));
});

// Image Routes
router.get("/backgroundimage", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

router.get("/fireworks", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/fireworks.jpg"));
});

router.get("/fireworks-mobile", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/fireworks_mobile.jpg"));
});

router.get("/datenight", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
});

router.get("/concert", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/concert.jpg"));
});

router.get("/calender", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/calender.jpg"));
});

router.get("/date1", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/date.jpg"));
});

router.get("/date2", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/images/datenight.jpg"));
});

module.exports = router;

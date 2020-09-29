const path = require("path");
const router = require("express").Router();

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
  app.get("/fireworks", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/fireworks.jpg"));
  });

  app.get("/datenight", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });
};

module.exports = router;

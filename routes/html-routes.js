const path = require("path");
const router = require("express").Router();

//HTML Routes
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/results", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

  app.get("/styles", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
  });

  //IMAGE ROUTES
  app.get("/backgroundimage", function (req, res) {
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

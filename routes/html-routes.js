var path = require("path");

//
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/styles", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stylesheets/styles.css"));
  });
  app.get("/mobile", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stylesheets/mobile.css"));
  });

  //IMAGE ROUTES
  app.get("/backgroundimage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });
};

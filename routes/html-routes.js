var path = require("path");

//
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  //IMAGE ROUTES
  app.get("/backgroundimage", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/images/rps.jpg"));
  });
};

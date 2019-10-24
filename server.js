var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

var passport = require("./config/passport");

var PORT = process.env.PORT || 8080;
var db = require("./models");


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes/api-routes");
const pageRoutes = require("./routes/html-routes");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/', apiRoutes);
app.use('/pages/', pageRoutes);
app.use(express.static("public"));


db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

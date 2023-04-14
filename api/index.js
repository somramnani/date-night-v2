var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

const authRouter = require("../routes/api-routes");
const apiRoutes = require("../routes/api-routes");
const pageRoutes = require("../routes/html-routes");
const usersRouter = require("../routes/user-routes");

var app = express();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "index",
    helpers: require("./views/helpers/helpers"),
    partialsDir: `${__dirname}/views/partials`,
  })
);
const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use("/api", apiRoutes);
app.use("/", pageRoutes);
app.use("/", authRouter);
app.use("/", usersRouter);

module.exports = app;

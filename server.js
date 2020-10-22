require("dotenv").config();
const express = require("express");
const handlebars = require("express-handlebars");
const cors = require("cors");
const flash = require("connect-flash");
const PORT = process.env.PORT || 8080;
const db = require("./models");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const cookieParser = require("cookie-parser");
const userInViews = require("./lib/middleware/userInViews");
const authRouter = require("./routes/auth-routes");
const apiRoutes = require("./routes/api-routes");
const pageRoutes = require("./routes/html-routes");
const usersRouter = require("./routes/user-routes");
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("/public"));
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

var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:8080/callback",
  },
  async (accessToken, refreshToken, extraParams, profile, done) => {
    const { user } = db.sequelize.models;

    const newUser = {
      oauthId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      image: profile.picture,
    };

    let foundUser = await user
      .findOne({ where: { firstName: profile.name.givenName } })
      .then((user) => user);

    if (foundUser) {
      console.log("this user already exists");
      return done(null, profile);
    } else {
      user.create(newUser).then((user) => {
        return done(null, profile);
      });
    }
  }
);

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

var sess = {
  secret: "datenight",
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get("env") === "production") {
<<<<<<< HEAD
  app.set("trust proxy", 1);

=======
  // app.set('trust proxy', 1);
>>>>>>> 9a94eca8fd9c280e48c1883c8a18787a30b4839d
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(userInViews());
app.use("/api", apiRoutes);
app.use("/", pageRoutes);
app.use("/", authRouter);
app.use("/", usersRouter);

// Handle auth failure error messages
app.use(function (req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
<<<<<<< HEAD
  const err = new Error("Not  Found");
=======
  const err = new Error("Not Found");
>>>>>>> 9a94eca8fd9c280e48c1883c8a18787a30b4839d
  err.status = 404;
  next(err);
});

//handles errors in development
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

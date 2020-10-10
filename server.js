require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('logger');
const apiRoutes = require("./routes/api-routes");
const pageRoutes = require("./routes/html-routes");
const flash = require('connect-flash');
const PORT = process.env.PORT || 8080;
const db = require("./models");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const userInViews = require("./lib/middleware/userInViews");
const authRouter = require("./routes/auth-routes");
const usersRouter = require("./routes/user-routes");

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
      image: profile.picture
    }

    let foundUser = 
      await user.findOne({ where: { firstName: profile.name.givenName }})
      .then(user => user);

    if(foundUser) {
      console.log('this user already exists');
        return done(null, profile);
    } else {
      user.create(newUser).then(user => { 
        return done(null, profile);
      })
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

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", pageRoutes);
app.use("/api", apiRoutes);
app.use(express.static("public"));

var sess = {
  secret: "datenight",
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get("env") === "production") {
  // app.set('trust proxy', 1);

  sess.cookie.secure = true;
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(userInViews());
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
  const err = new Error("Not Fucking Found");
  err.status = 404;
  next(err);
});

//handles errors in development
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.error(err.message)
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

const db = require("../models");
const express = require('express');
const router = express.Router();

router.post("/api/signup", function(req, res) {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
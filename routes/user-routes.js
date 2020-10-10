const db = require("../models");
const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.send('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

router.get("/itinerary", secured(), (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
});

router.post("/save-activity", (req, res, next) => {
  const { activityId } = req.body;
  // const { _raw, _json, ...userProfile } = req.user;

  res.json(activityId)

});

module.exports = router;

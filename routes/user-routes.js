const db = require("../models");
const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/itinerary", secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("itinerary", { layout: "index" });
});

router.post("/save-activity", (req, res, next) => {
  const { activityId } = req.body;
  // const { _raw, _json, ...userProfile } = req.user;

  res.json(activityId);
});

module.exports = router;

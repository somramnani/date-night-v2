const db = require("../models");
const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/itinerary", secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render("itinerary", { layout: "index", title: "Date Night | Itinerary" });
});

router.post("/save-activity", secured(), async (req, res, next) => {
  const { user, itinerary } = db.sequelize.models;
  const { ...userProfile } = req.user;
  const { type, id } = req.body;

  if(!req.user) {
    return res.status(400).json({error: 'You must be logged in to save activities!'})
  }

  let newActivity = {
    [type]: id
  };

  let thisUser = 
    await user.findOne({ 
      where: { 
        oauthId: userProfile.id 
      }
    }).then(u => u);

  thisUser.update({itinerary: newActivity}).then(it => console.log(it, it.id))

});

module.exports = router;

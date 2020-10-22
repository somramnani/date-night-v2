const db = require("../models");
const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();
const axios = require("axios");

/* GET user profile. */
router.get("/itinerary", secured(), async function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  const { itinerary } = db.sequelize.models;

  let foundItineraries = await itinerary
    .findAll({
      where: {
        oauthId: userProfile.id,
      },
    })
    .then((it) => it);

  res.render("itinerary", { layout: "index", title: "Date Night | Itinerary" });
});

router.post("/save-activity", secured(), async (req, res, next) => {
  const { user, itinerary, event } = db.sequelize.models;
  const { ...userProfile } = req.user;
  const { type, id } = req.body;

  if (!req.user) {
    console.error("must be logged in!");
    return res.status(400).json({
      error: "You must be logged in to save activities!",
    });
  }

  //we go to the db and locate the user whose oauthId
  //matches the current logged in user. we store that user in the currentUser binding...
  let currentUser = await user
    .findOne({
      where: {
        oauthId: userProfile.id,
      },
    })
    .then((u) => {
      return u;
    });

  //we create the itinerary with data from the client request
  //and the associated users information..
  itinerary
    .create(
      {
        activities: { [type]: id },
        user: {
          oauthId: currentUser.oauthId,
        },
      },
      {
        include: [
          {
            model: user,
            as: "user",
            where: { oauthId: currentUser.oauthId },
          },
        ],
      }
    )
    .then((log) => console.log(log))
    .catch((error) => console.log(error));
});

module.exports = router;

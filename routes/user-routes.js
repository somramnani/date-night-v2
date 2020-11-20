const db = require("../models");
const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/itinerary", secured(), async function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  const { itinerary, user } = db.sequelize.models;

  let currentUser = 
  await user.findOne({ 
    where: { 
      oauthId: userProfile.id 
    }
  }).then(user => {
    return user;
  });

  let foundItineraries = 
    await 
      itinerary.findAll({
        where: {
          userId: currentUser.id
        }
      }).then(usersItineraries => {
        return usersItineraries;
      });
  res.render('itinerary', { 
    data: foundItineraries,
    title: "Date Night | Itinerary"
  });
});

router.post("/save-itinerary", secured(), async (req, res, next) => {
  const { user, itinerary } = db.sequelize.models;
  const { ...userProfile } = req.user;

  const eventInfo = JSON.parse(req.body[0][1]);
  const restaurantInfo = JSON.parse(req.body[1][1]);

//we go to the db and locate the user whose oauthId 
//matches the current logged in user. we store that user in the currentUser binding...
  let currentUser = 
    await user.findOne({ 
      where: { 
        oauthId: userProfile.id 
      }
    }).then(user => {
      return user;
    });

  itinerary.create({
    restaurant: restaurantInfo,
    event: eventInfo,
    userId: currentUser.dataValues.id
  }).then(log => log)
    .catch(error => console.log(error))
});

module.exports = router;

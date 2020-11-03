const db = require("../models");
const express = require("express");
const secured = require("../lib/middleware/secured");
const router = express.Router();

/* GET user profile. */
router.get("/itinerary", secured(), async function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  const { itinerary } = db.sequelize.models;

  let foundItineraries = 
    await 
      itinerary.findAll({
        where: {
          oauthId: userProfile.id
        }
      }).then(usersItineraries => usersItineraries);

    return res.render('itinerary', { data: foundItineraries });
});

router.post("/save-activity", secured(), async (req, res, next) => {
  const { user, itinerary } = db.sequelize.models;
  const { ...userProfile } = req.user;
  const { type, yelpId, img, location, name, phone, price, reviews, url } = JSON.parse(req.body[0][1]);

  const restaurant = JSON.parse(req.body[0][1]);
  const event = req.body[1];

  console.log(event);
  console.log(restaurant);

  if (!req.user) {
    console.error("must be logged in!");
    return res.status(400).json({
      error: "You must be logged in to save activities!",
    });
  }

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

//we create the itinerary with data from the client request
//and the associated users information..
  itinerary.create({
    type,
    name,
    price,
    location,
    yelpId,
    img,
    phone,
    reviews,
    url,
    user: { 
      oauthId: currentUser.oauthId 
    }
  }, {
    include: [{
      model: user,
      as: 'user',
      where: { oauthId: currentUser.oauthId }
    }],
  }).then(log => log)
  .catch(error => console.log(error))
});

module.exports = router;

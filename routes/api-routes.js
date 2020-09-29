const db = require("../models");
const router = require('express').Router();
const axios = require('axios');
const yelpKey = process.env.YELP_TOKEN;

router.post(`/get-date-data`, (req, res) => {
  const { location, budget, startDate, endDate, dateType } = req.body;
  const baseURL = `https://api.yelp.com/v3`;
  let restaurantURL = `/businesses/search?location=${location}&price=${budget}`;
  let eventURL = `/events?location=${location}`;
  //TODO: Add google places for theater data

  //axios instance for yelp requests
  const instance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${yelpKey}` }
  });

  const getRestaurants = () => instance.get(restaurantURL);
  const getEvents = () => instance.get(eventURL);

  //fetch the data concurrently and send to client
  Promise.all([getRestaurants(), getEvents()])
    .then(results => { 
      const restaurants = results[0].data;
      const events = results[1].data;

      //TODO: this is where the conditional date type logic goes...
      res.json({ restaurants, events });
    })
    .catch(error => console.log(error));
});

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
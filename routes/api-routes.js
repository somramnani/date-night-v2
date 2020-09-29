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

module.exports = router;
<<<<<<< HEAD
=======

>>>>>>> 8d4afa4cfd6d80c602959914e484e576f2108b52

const router = require("express").Router();
const axios = require("axios");
const yelpKey = process.env.YELP_TOKEN;
const moment = require("moment");

router.post(`/get-activities/`, (req, res) => {
  console.log(req.body)
  const { location, startDate } = req.body;
  const date = moment().unix(startDate);
  const baseURL = `https://api.yelp.com/v3`;
  let restaurantURL = `/businesses/search?location=${location}&categories=restaurants&limit=50`;
  let eventURL = `/events?location=${location}&start_date=${date}`;

  const instance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${yelpKey}` },
  });

  const getRestaurants = () => instance.get(restaurantURL);
  const getEvents = () => instance.get(eventURL);

  Promise.all([getRestaurants(), getEvents()])
    .then((results) => {
      let restaurants =
        results[0].data.length === 0
          ? res.send("Sorry, no restaurants were found in your search!")
          : results[0].data.businesses.slice(0, 6);

      let events =
        results[1].data.length === 0
          ? res.send("Sorry, no events were found for this date/location!")
          : results[1].data.events;

      res.render("search-results", {
        restaurants,
        events,
        layout: "index",
        title: "Date Night | Search Results",
      });
      console.log(restaurants);
    })
    .catch((error) => console.log(error));
});

module.exports = router;

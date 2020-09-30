const db = require("../models");
const router = require('express').Router();
const axios = require('axios');
const yelpKey = process.env.YELP_TOKEN;
const moment = require('moment');

router.post(`/get-date-data`, async (req, res) => {
  const { location, budget, startDate, dateType } = req.body;

  const date = moment().unix(startDate)
  const baseURL = `https://api.yelp.com/v3`;
  let restaurantURL = `/businesses/search?location=${location}`;
  let eventURL = `/events?location=${location}&start_date=${date}`;

  //axios instance for yelp requests
  const instance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${yelpKey}` }
  });

  // const getRestaurants = () => instance.get(restaurantURL);
    switch(dateType) {
      case 'exciting': { 
        const getRestaurants = () => instance.get(restaurantURL + '&limit=10&categories=nightlife,active')
        const getEvents = () => instance.get(eventURL + '&categories=bars')

        return Promise.all([getRestaurants(), getEvents()])
          .then(results => {
            let restaurants = results[0].data;
            let events = results[1].data;
            
            res.json({restaurants, events})
          })
      }
      break;
      case 'romantic': {
        instance.get(eventURL + '&categories=wine-tasting,food-and-drink');
        instance.get(restaurantURL + '&categories=wine_bars,french,winetastingroom')
      }
      break;
      case 'relaxing': {
        instance.get(eventURL + '&categories=wine-tasting,food-and-drink');
        instance.get(restaurantURL + '&categories=wine_bars,french,winetastingroom')
      }
    }

  //fetch the data concurrently and send to client
  // Promise.resolve()
  //   .then(results => { 
  //     let restaurants = results[0].data.restaurants;
  //     let events = results[1].data.events;
            
  //     console.log(results)
      
  //   })
  //   .catch(error => console.log(error));
});

module.exports = router;

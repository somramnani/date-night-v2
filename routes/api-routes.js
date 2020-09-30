const db = require("../models");
const router = require('express').Router();
const axios = require('axios');
const yelpKey = process.env.YELP_TOKEN;

router.post(`/get-date-data`, async (req, res) => {
  const { location, budget, startDate, dateType } = req.body;
  const baseURL = `https://api.yelp.com/v3`;
  let restaurantURL = `/businesses/search?location=${location}&price=${budget}`;
  let eventURL = `/events?location=${location}`;

  //axios instance for yelp requests
  const instance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${yelpKey}` }
  });

  // const getRestaurants = () => instance.get(restaurantURL);


    switch(dateType) {
      case 'exciting': { 
        const getRestaurants = () => instance.get(eventURL + '&categories=nightlife,active')
        const getEvents = () => instance.get(restaurantURL + '&categories=bars')

        Promise.all([getRestaurants(), getEvents()])
          .then(results => {
            let restaurants = results[0].data.restaurants;
            let events = results[1].data.events;

            console.log(results);
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

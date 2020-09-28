//________________________________________________________
//Price Button Variables
//________________________________________________________

//Price Button value variables
var price1 = $(".price1").val();
var price2 = $(".price2").val();
var price3 = $(".price3").val();
var price4 = $(".price4").val();
var price5 = $(".price5").val();

// Price button input field
var priceEntry = $(".price_entry");
//________________________________________________________

//________________________________________________________
//Activities Button Variables
//________________________________________________________

//Activity Button value variables

var activities1 = $(".activities1").val();
var activities2 = $(".activities2").val();
var activities3 = $(".activities3").val();

// Activity button input field
var activityEntry = $(".activities_entry");
//________________________________________________________

//________________________________________________________
//BUTTON FUNCTIONS
//________________________________________________________

//________________________________________________________
//Price Button On-Click Functions
//________________________________________________________
var userBudget;
//If one of the $ is selected, then make the input value(priceEntry) value that price

$(".price1").on("click", function() {
  priceEntry.attr("value", "1");
  userBudget = priceEntry.val();
});

$(".price2").on("click", function() {
  priceEntry.attr("value", "2");
  userBudget = priceEntry.val();
});

$(".price3").on("click", function() {
  priceEntry.attr("value", "3");
  userBudget = priceEntry.val();
});

$(".price4").on("click", function() {
  priceEntry.attr("value", "4");
  userBudget = priceEntry.val();
});

$(".price5").on("click", function() {
  priceEntry.attr("value", "5");
  userBudget = priceEntry.val();
});

$(".price5").on("click", function() {
  priceEntry.attr("value", "5");
});
//________________________________________________________

//________________________________________________________
//Price Button On-Click Functions
//________________________________________________________

$("#submit").on("click", function() {
  event.preventDefault();
  // This is the input value of activities:
  var activityEntryValue = $(".activities_entry").val();
  console.log(activityEntryValue);

  var addressInput = $("#location")
    .val()
    .trim();

  if (addressInput === "") {
    alert("Location is required");
    event.preventDefault();
  } else {
    //______________________________________________________
    //API VARIABLES
    //______________________________________________________
    var yelpAPIKey =
      "";
    var yelpURL =
      "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" +
      addressInput +
      "&limit=6&price=" +
      userBudget;

    var eventSearchURL =
      "https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?location.address=" +
      addressInput +
      "&expand=ticket_classes&expand=venue&token=";

    let placesAPIKey = "";
    let placesURL =
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=theaters+in+" +
      addressInput +
      "&key=" +
      placesAPIKey;
  //________________________________________________________

   //________________________________________________________
    //API'S AJAX REQUEST
   //________________________________________________________
    // YELP API
    $.ajax({
      url: yelpURL,
      cache: true,
      headers: {
        Authorization: "Bearer " + yelpAPIKey
      },
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      console.warn("<------yelp results----->");
      console.log(response);

      for (var i = 0; i < response.businesses.length; i++) {
        var restaurantDiv = $("#rest-results");
        var restPrice = response.businesses[i].price;
        var restCity = response.businesses[i].location.city;
        var restState = response.businesses[i].location.state;
        var restImage = response.businesses[i].image_url;
        var webURL = response.businesses[i].url;
        var name = response.businesses[i].name;
        var rating = response.businesses[i].rating;

        var restCol = $("<div>").addClass("col-md-4");
        var restCardContainer = $("<div>")
          .addClass("card m-2")
          .attr("style", "width: 18rem");
        var restCardImg = $("<img>")
          .addClass("card-img-top h-auto")
          .attr("src", restImage)
          .attr("alt", "restaurant-pic");
        var restCardBody = $("<div>").addClass("card-body");
        var restCardTitle = $("<h5>")
          .addClass("card-header")
          .html(name);
        var restCardText = $("<p>")
          .addClass("card-text font-weight-light mx-2")
          .text(restCity + ", " + restState);
        var restCardList = $("<ul>").addClass("list-group list-group-flush");
        var restCardListItem = $("<li>")
          .addClass("list-group-item")
          .html("User Rating: " + rating);
        var restCardListItem2 = $("<li>")
          .addClass("list-group-item")
          .html("Price Range: " + restPrice);
        var restCardLink = $("<a>")
          .addClass("btn btn-success")
          .html("Visit us on Yelp!")
          .attr("href", webURL)
          .attr("target", "_blank");

        var restResultCard = restCardContainer.append(
          restCardImg,
          restCardBody,
          restCardTitle,
          restCardText,
          restCardList,
          restCardListItem,
          restCardListItem2,
          restCardLink
        );
        restaurantDiv.append(restCol);
        restCol.append(restResultCard);
      }
    });

    // Eventbrite API
    $.ajax({
      url: eventSearchURL,
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      console.warn("<------eventbrite results------->");
      console.log(response);

      var localEventView = $("#local-results");

      for (var i = 0; i < response.events.length; i++) {
        var eventName = response.events[i].name.text;
        var eventPic = response.events[i].logo.original.url;
        var eventDescription = response.events[i].summary;
        var eventLink = response.events[i].url;
        var eventVenue = response.events[i].venue.name;

        var eventCol = $("<div>").addClass("col-md-4");
        var eventCardContainer = $("<div>")
          .addClass("card m-2")
          .attr("style", "width: 15rem");
        var eventCardImg = $("<img>")
          .addClass("card-img-top h-auto")
          .attr("alt", "image")
          .attr("src", eventPic);
        var eventCardBody = $("<div>").addClass("card-body");
        var eventCardTitle = $("<h5>")
          .addClass("card-header")
          .html(eventName);
        var eventCardText = $("<p>")
          .addClass("card-text font-weight-light mx-2")
          .html("Venue: " + eventVenue);
        var eventCardList = $("<ul>").addClass("list-group list-group-flush");
        var eventCardListItem = $("<li>")
          .addClass("list-group-item")
          .html("Description: " + eventDescription);
        var eventCardLink = $("<a>")
          .addClass("btn btn-success")
          .html("Learn More At EventBrite!")
          .attr("href", eventLink)
          .attr("target", "_blank");

        var eventResultCard = eventCardContainer.append(
          eventCardImg,
          eventCardBody,
          eventCardTitle,
          eventCardText,
          eventCardList,
          eventCardListItem,
          eventCardLink
        );

        localEventView.append(eventCol);
        eventCol.append(eventResultCard);
      }
    });

    // Google Places API
    $.ajax({
      url: placesURL,
      method: "GET",
      dataType: "json"
    }).then(function(response) {
      var movieTheatersRow = $("#theater-results");
      for (var i = 0; i < response.results.length; i++) {
        console.log(response.results);

        var theaterName = response.results[i].name;
        var theaterAddress = response.results[i].formatted_address;
        var theaterRating = response.results[i].rating;
        var theaterThumbnail = "images/theatrethumbnail.jpg";

        var theaterCol = $("<div>").addClass("col-md-4");
        var cardContainer = $("<div>")
          .addClass("card m-2")
          .attr("style", "width: 16rem");
        var cardImg = $("<img>")
          .addClass("card-img-top h-auto")
          .attr("alt", "image")
          .attr("src", theaterThumbnail);
        var cardBody = $("<div>").addClass("card-body");
        var cardTitle = $("<h5>")
          .addClass("card-header")
          .html(theaterName);
        var cardText = $("<p>")
          .addClass("card-text font-weight-light mx-2")
          .html("Address: " + theaterAddress);
        var cardList = $("<ul>").addClass("list-group list-group-flush");
        var cardListItem = $("<li>")
          .addClass("list-group-item")
          .html("Theater Rating: " + "<strong>" + theaterRating + "</strong>");

        var movieResultCard = cardContainer.append(
          cardImg,
          cardBody,
          cardTitle,
          cardText,
          cardList,
          cardListItem
        );

        movieTheatersRow.append(theaterCol);
        theaterCol.append(movieResultCard);
      }
    });
  }
});

var searchBarCalendar = document.getElementById("calendar");
searchBarCalendar.value = moment().format("YYYY-MM-DD");

window.onload = function () {
  document.getElementById("loading").style.display = "none";
};

let restaurantSlot = document.getElementById('restaurant');
let eventSlot = document.getElementById('event');
let eventWrapper = document.getElementById('event-wrapper');
let restaurantWrapper = document.getElementById('rest-wrapper')

const truncateSlotText = text => {
  let letters = text.split('');
  if(letters.length > 20) {
    letters.splice(30, letters.length - 30, '...');
  }
  return letters.join('');
}
// This conditional block runs everytime the page loads - it first checks the sessionStorage for keys...
if(sessionStorage.length !== 0) {
//If there are events, it sets the event slot DOM el inner HTML to the name. Otherwise, it hides the el.
  if(sessionStorage.getItem('event')) {
    eventSlot.innerHTML = truncateSlotText(JSON.parse(sessionStorage.getItem('event')).name);
  } else {
    eventWrapper.style.display = 'none';
  }
//Same logic as above, but for the restaurant. Good candidate for a refactor at some point.
  if(sessionStorage.getItem('restaurant')) {
    restaurantSlot.innerHTML = truncateSlotText(JSON.parse(sessionStorage.getItem('restaurant')).name);
  } else {
    restaurantWrapper.style.display = 'none';
  } 
} else {
  restaurantWrapper.style.display = 'none';
  eventWrapper.style.display = 'none';
};

//Shows dropdown content
function displayDropDown() {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns[i];
    dropdown.classList.toggle("show");
  }
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const addActivity = (
  date,
  type,
  yelpId,
  img,
  url,
  name,
  address,
  city,
  state,
  zipcode, 
  price,
  rating, 
  reviews,
  phone,
  description,
  timeStart,
  timeEnd,
  ticketsUrl,
  transactions
  ) => {

  const activityObj = {
    date,
    type,
    yelpId,
    img,
    url,
    name,
    address,
    city,
    state,
    zipcode, 
    price,
    rating, 
    reviews,
    phone, 
    description, 
    timeStart,
    timeEnd,
    ticketsUrl,
    transactions
  };
 
  if(sessionStorage.length === 2) {
   alert(
      `Cannot store another activity. Please remove an activity from your itinerary first.`
    )
  } else {
    let activitySlot = 
      type === 'event' ? 
      document.getElementById('event-wrapper') : 
      document.getElementById('rest-wrapper');

    sessionStorage.setItem(type, JSON.stringify(activityObj));
    document.getElementById(type).innerHTML = truncateSlotText(JSON.parse(sessionStorage.getItem(type)).name);
    activitySlot.style.display = 'flex';
  };
};

const removeActivity = type => {
  if(sessionStorage.length === 0) {
    return console.error('cannot remove any activities - try adding one first!')
  }

  let activitySlot = 
    type === 'event' ? 
    document.getElementById('event-wrapper') : 
    document.getElementById('rest-wrapper');

  activitySlot.style.display = 'none';
  sessionStorage.removeItem(type)
};
var modalBody = document.getElementsByClassName("modal-body");

const saveItinerary = () => {

  if(sessionStorage.length <= 1) {
    document.getElementById("ModalLabel").innerHTML = "Cannot save an incomplete itinerary ";
    document.getElementById("modal-body").innerHTML = "Please add some activities!";
  }
  else{
    document.getElementById("ModalLabel").innerHTML = "Saved to your itinerary! ";
    document.getElementById("modal-body").innerHTML = `Your itinerary has been updated.`;
  }

  let activityArray = Object.entries(sessionStorage);

  fetch(`/save-itinerary`, { 
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityArray)
  })
  .then(response => response.json())
  .then(data => data)
  .catch(error => console.error(error))
};

function deleteIt(id){

  fetch(`http://localhost:8080/delete-full-itinerary/${id}`, 
  { 
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => console.log(data))

};

const signInAlert = () =>{
  document.getElementById("ModalLabel").innerHTML = "You are not signed in. ";
  document.getElementById("modal-body").innerHTML = "Please sign in to save items to your Itinerary.";
}




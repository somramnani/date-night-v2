var searchBarCalendar = document.getElementById("calendar");
searchBarCalendar.value = moment().format("YYYY-MM-DD");

window.onload = function () {
  document.getElementById("loading").style.display = "none";
};

var searchBarCalendar = document.getElementById("calendar");
searchBarCalendar.value = moment().format("YYYY-MM-DD");

//Shows dropdown content
function displayDropDown() {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns[i];
    dropdown.classList.toggle("show");
  }
};

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

//rules for activities:
//cannot contain more than one of the same type (restaurant, event)
//cannot contain more than two total activities
//ids should not be duplicates either

const addActivity = (
  type,
  yelpId,
  img,
  url,
  name,
  location, 
  price, 
  reviews, 
  phone) => {

  const activityObj = {
    type,
    yelpId,
    location,
    name,
    img,
    url,
    price,
    reviews,
    phone
  };

  for(let i = 0; i < 2; i++) {
    if(sessionStorage.key(i) === 'restaurant' || 'event') {
      return console.log('duplicate selection type was made - please try adding a different activity type (ie. restaurant or event!')
    }
  }

  if(sessionStorage.length === 2) {
    return console.error(
      `cannot store another activity 
      - please remove an activity from your itinerary first.`
    )
  } else {
    sessionStorage.setItem(type, JSON.stringify(activityObj))
  }

};

const removeActivity = id => {
  if(sessionStorage.length === 0) {
    return console.error('cannot remove any activities - try adding one first!')
  }
  sessionStorage.removeItem(id)
};

const saveItinerary = () => {
  let activityArray = Object.entries(sessionStorage);

  fetch(`/save-activity`, { 
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activityArray)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
  
};


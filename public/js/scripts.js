var searchBarCalendar = document.getElementById("calendar");
searchBarCalendar.value = moment().format("YYYY-MM-DD");

window.onload = function () {
  document.getElementById("loading").style.display = "none";
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

const saveActivity = (id, type) => {
  const pack = { id, type };
  fetch(`/save-activity`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pack),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
console.log(window.location);

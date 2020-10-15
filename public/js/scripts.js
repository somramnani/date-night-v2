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

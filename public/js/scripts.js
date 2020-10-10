const CardComponent = props => {
  const col = document.createElement("div");
  col.classList.add("col-sm", "results-div");
  const card = document.createElement("div");
  card.classList.add("card", "result-cards");
  const image = document.createElement("img");
  image.classList.add("card-img-top", "restaurant-results-image");
  image.setAttribute("src", props.imageSrc);
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const cardTitle = document.createElement("h6");
  cardTitle.className = "card-title";
  const cardText = document.createElement("p");
  cardText.className = "card-text";

  const saveBtn = document.createElement('button');
  saveBtn.classList.add('btn', 'btn-success');
  saveBtn.innerText = "Save To Itinerary";
  
  saveBtn.onclick = e => {
    const activityId = props.key;
    e.preventDefault();

    fetch('/save-activity', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activityId)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }

  cardTitle.append(props.cardTitle);
  cardText.append(props.cardContent);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(saveBtn);
  card.appendChild(image);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
};

const fetchResults = e => {
  e.preventDefault();

  const locationInput = document.getElementById("location");
  const dayOfDateInput = document.getElementById("calendar");
  const restaurantResults = document.getElementById("restaurant-results");
  const eventResults = document.getElementById("event-results");

  const dateData = {
    location: locationInput.value,
    startDate: dayOfDateInput.value,
  };

  fetch(`http://localhost:8080/api/get-date-data`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(dateData),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    data.events.length > 0 ?
    data.events.map(el => {
      eventResults
        .appendChild(
          CardComponent({
            key: el.id,
            imageSrc: el.image_url,
            cardTitle: el.name,
            cardText: el.description
          })
        )
    }) : eventResults.append('Sorry! No events were found!');

    data.restaurants.length > 0 ?
    data.restaurants.map(el => {
      restaurantResults
        .appendChild(
          CardComponent({
            key: el.id,
            imageSrc: el.image_url,
            cardTitle: el.name,
            cardText: el.location.address
          })
        )
      }) : restaurantResults.append('Sorry! No restaurants were found!');

    });
};

const NavBar = props => {
  const navWrapper = document.createElement('nav');
  navWrapper.classList.add('navbar', 'navbar-expand-lg', 'navbar-light');
  const navLogo = document.createElement('a');
  navLogo.innerText = "Date Night";
  navLogo.className = 'navbar-brand';
  navLogo.setAttribute('id', 'navbar-logo');
  navLogo.setAttribute('href', '/');

  const navCollapse = document.createElement('div');
  navCollapse.classList.add('collapse', 'navbar-collapse');
  navCollapse.setAttribute('id', 'navbarSupportedContent');
  
  const navListOuter = document.createElement('ul');
  navListOuter.classList.add('navbar-nav', 'mr-auto');

  const navListInner = document.createElement('ul');
  navListInner.classList.add('navbar-nav', 'mr-auto');

  const navListItemWrapper = document.createElement('li');
  navListItemWrapper.className = 'nav-item';

  const navListDropdown = document.createElement('li');
  navListDropdown.classList.add('nav-item', 'dropdown');

  const navLinkToggle = document.createElement('a');
  navLinkToggle.classList.add('nav-link', 'dropdown-toggle');
  navLinkToggle.setAttribute('href', "#");
  navLinkToggle.setAttribute('id', 'navbarDropDown');
  navLinkToggle.setAttribute('role', 'button');
  navLinkToggle.setAttribute('data-toggle', 'dropdown');
  navLinkToggle.setAttribute('aria-haspopup', 'true');
  navLinkToggle.setAttribute('aria-expanded', 'false');

  const userImg = document.createElement('img');
  userImg.classList.add('nav-user-profile', 'profile-image', 'rounded-circle', 'user-image');
  userImg.setAttribute('src', props.userImage)
  userImg.setAttribute('width', 40);

  navWrapper.appendChild(navLogo);
  navLinkToggle.appendChild(userImg);
  navListDropdown.appendChild(navLinkToggle);
  navListItemWrapper.appendChild(navListDropdown);
  navListInner.appendChild(navListItemWrapper);
  navListOuter.appendChild(navListInner);
  navCollapse.appendChild(navListOuter);
  navWrapper.appendChild(navCollapse);
  
  return navWrapper;
}

const getUserInfo = async () => {
  const navcontainer = document.getElementById('nav-container')
    
  fetch('/get-user')
    .then(resp => resp.json())
    .then(data => {
      navcontainer.appendChild(NavBar({ userImg: data.picture }))
    })
    .catch(error => console.log(error));
  
}

getUserInfo();
const CardComponent = (props) => {
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

  cardTitle.append(props.cardTitle);
  cardText.append(props.cardContent);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(image);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
};

const fetchResults = async (e) => {
  e.preventDefault();

  const locationInput = document.getElementById("location");
  const dateTypeInput = document.getElementById("dateType");
  const dayOfDateInput = document.getElementById("calendar");
  const restaurantResults = document.getElementById("restaurant-results");
  const eventResults = document.getElementById("event-results");

  const dateData = {
    location: locationInput.value,
    dateType: dateTypeInput.value,
    startDate: dayOfDateInput.value,
  };

  await fetch(`http://localhost:8080/api/get-date-data`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(dateData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.restaurants.map((el) => {
        eventResults.appendChild(
          CardComponent({
            key: el.id,
            imageSrc: el.image_url,
            cardTitle: el.name,
            cardText: el.location.address,
          })
        );
      });
    });
};

const date = moment().format("YYYY-MM-DD");
const calender = document.getElementById("calender");
calender.setAttribute("value", date);
calender.setAttribute("min", date);

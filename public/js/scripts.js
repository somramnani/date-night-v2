const CardComponent = props => {
  
}

const fetchResults = e => {
  e.preventDefault();
  
  const locationInput = document.getElementById('location');
  const dateTypeInput = document.getElementById('dateType');
  const dayOfDateInput = document.getElementById('calendar');
  
  const dateData = {
    location: locationInput.value,
    dateType: dateTypeInput.value,
    startDate: dayOfDateInput.value
  }

  return fetch(`http://localhost:8080/api/get-date-data`, {
    headers: {
      'Content-Type': 'application/json'
    },  
    method: 'post',
    body: JSON.stringify(dateData)
  })
  .then(response => response.json())
  .then(data => {
      
      data.restaurants.businesses.map(el => {
        console.log(el)
      })
    });
}
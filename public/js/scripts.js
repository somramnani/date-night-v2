const fetchResults = e => {
  e.preventDefault();

  const locationInput = document.getElementById('')
  
  const mockData = {
    location: 'New York City',
    budget: '3',
    dateType: 'exciting'
  }

  return fetch(`http://localhost:8080/api/get-date-data`, {
    headers: {
      'Content-Type': 'application/json'
    },  
    method: 'post',
    body: JSON.stringify(mockData)
  })
    .then(response => response.json())
    .then(data => data);
}
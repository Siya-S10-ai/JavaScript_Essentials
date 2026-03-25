function showweatherDetails(event) {
    event.preventDefault();
    // above code prevents the default behaviour of an event
    // such as form submission, within a function named showweatherDetails.

    const city = document.getElementById('city').value;
    const apiKey = 'bacdfb7a0d71a302a25ab8c6f1cdc3ed';
    const apiUrl = ` https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                    <p>Temperature: ${data.main.temp} &#8451;</p>
                                    <p>Weather: ${data.weather[0].description}</p>`;
        }).catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again.</p>`;
        });
}

document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
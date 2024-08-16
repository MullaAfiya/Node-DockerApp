const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Open-Meteo API URL (replace with the latitude and longitude of your desired location)
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true';

// Set up a basic route
app.get('/', async (req, res) => {
  try {
    // Make a request to the external API
    const response = await axios.get(apiUrl);

    // Extract the current weather data from the response
    const data = response.data.current_weather;

    // Display the weather information in a simple HTML format
    res.send(`
      <h1>Weather Report for London</h1>
      <p>Temperature: ${data.temperature}°C</p>
      <p>Wind Speed: ${data.windspeed} km/h</p>
      <p>Weather: ${data.weathercode}</p>
    `);
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Something went wrong!');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});

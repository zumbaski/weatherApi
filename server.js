const express = require('express');
const axios = require('axios');

const app = express();
const port = 3030;

const apiKey = '6627a6eb4aa007f40980009dcb129eb4';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

app.get('/weather', async (req, res) => {
    const { city } = req.query;
  
    if (!city) {
      return res.status(400).send({ error: 'City is required' });
    }
    try {
        const response = await axios.get(`${baseUrl}`, {
          params: {
            q: city,
            appid: apiKey,
            units: 'metric', // or 'imperial' for Fahrenheit
          },
        });
        const weatherData = response.data;
        res.send({
          city: weatherData.name,
          temperature: weatherData.main.temp,
          description: weatherData.weather[0].description,
          humidity: weatherData.main.humidity,
          windSpeed: weatherData.wind.speed,
        });
      } catch (error) {
        if (error.response) {
          return res.status(error.response.status).send({ error: error.response.data.message });
        }
        res.status(500).send({ error: 'An error occurred while fetching the weather data' });
      }
    });
    
    app.listen(port, () => {
      console.log(`Weather server is running at http://localhost:${port}`);
    });
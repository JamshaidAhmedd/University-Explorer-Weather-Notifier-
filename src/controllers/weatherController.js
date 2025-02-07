const axios = require('axios');
const { logger } = require('../config/logger');
const { weatherApiKey, city } = require('../config/apiKeys');

const getWeatherData = async () => {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
      params: {
        key: weatherApiKey,
        q: city,
        days: 1, 
      },
    });

    const weather = response.data;

    if (!weather || !weather.forecast) {
      throw new Error('Invalid weather data received.');
    }

    const temperature = weather.current.temp_c;
    const precipitation = weather.forecast.forecastday[0].day.daily_chance_of_rain;

    logger.info(`Weather data for ${city}: Temp=${temperature}°C, Rain chance=${precipitation}%`);
    return { temperature, precipitation };
  } catch (error) {
    logger.error(`Error fetching weather data: ${error.message}`);
    throw error;
  }
};

module.exports = { getWeatherData };

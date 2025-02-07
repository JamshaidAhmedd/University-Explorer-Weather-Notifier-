const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const notificationController = require('../controllers/notificationController');

router.get('/api/weather_data', async (req, res) => {
  try {
    const weatherData = await weatherController.getWeatherData();
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
});

router.get('/send_notification', async (req, res) => {
  try {
    await notificationController.sendDailyNotification();
    res.send('Notification sent successfully.');
  } catch (error) {
    res.status(500).send('Failed to send notification.');
  }
});

module.exports = router;

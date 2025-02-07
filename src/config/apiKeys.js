require('dotenv').config();

module.exports = {
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  weatherApiKey: process.env.WEATHER_API_KEY,
  notificationEmail: process.env.NOTIFICATION_EMAIL,
  notificationPhone: process.env.NOTIFICATION_PHONE,
  city: process.env.CITY,
};

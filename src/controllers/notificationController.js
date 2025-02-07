const sgMail = require('@sendgrid/mail');
const { sendGridApiKey, notificationEmail,city } = require('../config/apiKeys');
const { getWeatherData } = require('./weatherController');
const { logger } = require('../config/logger');

sgMail.setApiKey(sendGridApiKey);

const sendEmail = async (subject, text) => {
  const msg = {
    to: notificationEmail,
    from: notificationEmail, // Verified sender
    subject: subject,
    text: text,
  };

  try {
    await sgMail.send(msg);
    logger.info(`Email sent to ${notificationEmail}.`);
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

const sendDailyNotification = async () => {
  try {
    const { temperature, precipitation } = await getWeatherData();
    const message = `Today's temperature in ${city}: ${temperature}°C. Possibility of rain: ${precipitation}%.`;

    await sendEmail('Daily Weather Update', message);
  } catch (error) {
    logger.error(`Error in sendDailyNotification: ${error.message}`);
  }
};

module.exports = { sendDailyNotification };

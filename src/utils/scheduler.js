const cron = require('node-cron');
const { sendDailyNotification } = require('../controllers/notificationController');
const { logger } = require('../config/logger');

// Schedule the job to run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  logger.info('Executing daily weather notification job.');
  await sendDailyNotification();
});

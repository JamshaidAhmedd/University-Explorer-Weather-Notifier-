const axios = require('axios');
const { logger } = require('../config/logger');

const fetchFromAPI = async (url) => {
  try {
    const response = await axios.get(url);
    logger.info(`Fetched data from ${url}`);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching data from ${url}: ${error.message}`);
    throw error;
  }
};

module.exports = { fetchFromAPI };

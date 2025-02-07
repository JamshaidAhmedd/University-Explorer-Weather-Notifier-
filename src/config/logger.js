const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../../log.txt'), { flags: 'a' });

const logger = {
  info: (message) => {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message}\n`;
    process.stdout.write(logMessage);
    logStream.write(logMessage);
  },
  error: (message) => {
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
    process.stderr.write(logMessage);
    logStream.write(logMessage);
  },
};

module.exports = { logger };

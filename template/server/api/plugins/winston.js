/**
 * @module API/plugins/winston
 * @requires {@link https://github.com/winstonjs/winston winston}
 * @requires fs
 * @description
 * LEVELS
 * -------------
 * error: 0,
 * warn: 1,
 * info: 2,
 * verbose: 3,
 * debug: 4,
 * silly: 5
 */

const fs = require('fs');
const winston = require('winston');
const path = require('path');
require('winston-daily-rotate-file');

const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * @name logger
 * @function
 * @description run winston instance with settings
 * @param {Object} settings Settings of winston {@link https://github.com/winstonjs/winston GitHub}
 * @return {undefined}
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, `/../../../${logDir}/error-%DATE%.log`),
      datePattern: 'YYYY-MM-DD',
      // zippedArchive: true,
      maxSize: '10m',
      maxFiles: '15d',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, `/../../../${logDir}/combined-%DATE%.log`),
      datePattern: 'YYYY-MM-DD',
      // zippedArchive: true,
      maxSize: '10m',
      maxFiles: '15d',
    }),
  ],
});

// Call exceptions.handle with a transport to handle exceptions
logger.exceptions.handle(
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, `/../../../${logDir}/exceptions-%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    // zippedArchive: true,
    maxSize: '10m',
    maxFiles: '15d',
  }),
);

// If not production env => add console.log error
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = logger;

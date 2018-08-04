/* eslint-disable */

const logger = require('./../server/api/plugins/winston');

module.exports = function(options) {
  // It's used for to log error sended to errorPage
  this.nuxt.hook('render:route', (url, result) => {
    if (result.error !== null) {
      let level;
      const statusCode = result.error.statusCode || 500;

      if (statusCode >= 400 && statusCode < 500) {
        level = 'warn';
      } else if (statusCode >= 500) {
        level = 'error';
      }

      logger.log({
        level,
        label: 'Error Page Context',
        StatusCode: statusCode,
        message: result.error.message || '',
      });
    }
  });

  this.nuxt.hook('render:errorMiddleware', app => {
    app.use((err, req, res, next) => {
      let statusCode;
      let errorMessage;

      if (typeof err.response !== 'undefined') {
        let level;

        statusCode = err.response.status;
        errorMessage = err.response.data.message;

        if (err.response.status >= 400 && err.response.status < 500) {
          level = 'warn';
        } else if (err.response.status >= 500) {
          level = 'error';
        }

        logger.log({
          level,
          label: err.response.request.path,
          StatusCode: statusCode,
          message: err.response.data,
        });
      } else {
        statusCode = 500;
        errorMessage = 'Internal Server Error';

        logger.log({
          level: 'error',
          label: errorMessage,
          StatusCode: statusCode,
          message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
        });
      }

      next(err);
    });
  });
};

import logger from './../plugins/winston';

export default fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
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
      errorMessage = `${err.name} - ${err.message}`;

      logger.log({
        level: 'error',
        label: errorMessage,
        StatusCode: statusCode,
        message: JSON.stringify(err, Object.getOwnPropertyNames(err)),
      });
    }

    res.status(statusCode).send(errorMessage);
  });
};

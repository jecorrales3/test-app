const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
}

function logErrors(err, req, res, next) {
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(err.response.status);
  res.json(withErrorStack(payload, err.stack, err.response.status));
  console.log('ERROR: ', err.response.status);
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};

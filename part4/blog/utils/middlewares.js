const logger = require('./logger');

const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};
const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    const errorMessages = Object.entries(error.errors).map(
      ([field, errorObject]) => `${field}: ${errorObject.message}`
    );
    const errorMessage = errorMessages[0].split(': ')[1];
    return response.status(400).json({ error: errorMessage });
  }
  next(error);
};
const tokenExtractor = (request, _, next) => {
  const authorization = request.get('authorization');
  let token = null;
  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '');
  }
  request.token = token;
  next();
};
const middlewares = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
module.exports = middlewares;

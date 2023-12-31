const jwt = require('jsonwebtoken');
const User = require('../models/User');
const loginValidationMessages = require('../models/loginValidationMessages');
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
  if (error.name === 'JsonWebTokenError' && error.message === 'jwt malformed') {
    return response.status(401).json({ error: loginValidationMessages.malformedToken });
  }
  if (error.name === 'JsonWebTokenError' && error.message === 'jwt must be provided') {
    return response.status(401).json({ error: loginValidationMessages.forgottenToken });
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
const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      response.status(401).json({ error: loginValidationMessages.invalidToken });
    }
    request.user = await User.findById(decodedToken.id);
  }
  next();
};
const middlewares = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
module.exports = middlewares;

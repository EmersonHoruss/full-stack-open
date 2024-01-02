const express = require('express');
const cors = require('cors');
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middlewares');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const paths = require('./constants/paths');

const app = express();
mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(paths.blogs, blogsRouter);
app.use(paths.users, usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;

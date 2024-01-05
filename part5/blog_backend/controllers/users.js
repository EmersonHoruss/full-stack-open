const router = require('express').Router();
const User = require('../models/User');
const logger = require('../utils/logger');
const crypt = require('../constants/crypt');
const bcrypt = require('bcryptjs');

router.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogIds');
  response.json(users);
});
router.post('/', async (request, response) => {
  const { body: user } = request;
  logger.info('user request body: ', user);
  const messageOfInvalidPassword = getMessageOfInvalidPassword(user.password);
  const isInvalidPassword = !!messageOfInvalidPassword;
  if (isInvalidPassword) {
    return response.status(400).json({
      error: messageOfInvalidPassword,
    });
  }
  const passwordHash = await bcrypt.hash(user.password, crypt.saltRounds);
  user.password = passwordHash;
  const userToSave = new User(user);
  const savedUser = await userToSave.save();
  logger.info('saved user in db:', savedUser);
  response.status(201).json(savedUser);
});
const getMessageOfInvalidPassword = (password) => {
  if (!password) {
    return 'password is required';
  }
  if (password.length < 3) {
    return 'password must have at least 3 characters';
  }
  return null;
};
module.exports = router;

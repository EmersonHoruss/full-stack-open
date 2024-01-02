const router = require('express').Router();
const User = require('../models/User');
const logger = require('../utils/logger');
const crypt = require('../constants/crypt');
const bcrypt = require('bcryptjs');

router.get('/', async (_, response) => {
  const users = await User.find({});
  response.json(users);
});
router.post('/', async (request, response) => {
  const { body: user } = request;
  logger.info('user request body: ', user);
  const passwordHash = await bcrypt.hash(user.password, crypt.saltRounds);
  user.password = passwordHash;
  const userToSave = new User(user);
  const savedUser = await userToSave.save();
  logger.info('saved user in db:', savedUser);
  response.status(201).json(savedUser);
});
module.exports = router;

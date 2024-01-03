const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/User');
const validationMessages = require('../models/loginValidationMessages');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password);
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: validationMessages.invalidUsernameOrPassword,
    });
  }
  const userForToken = {
    username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  response.status(200).send({ token, username, name: user.name });
});

module.exports = loginRouter;

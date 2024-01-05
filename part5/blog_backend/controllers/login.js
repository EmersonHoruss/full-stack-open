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
loginRouter.post('/malformedToken', async (request, response) => {
  jwt.verify(request.token, process.env.SECRET);
});
loginRouter.post('/tokenMatchWithUsername', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (decodedToken.username !== request.body.username) {
    response.status(400).send({ error: validationMessages.tokenUnmatchWithUsername });
  }
  response.status(200).end();
});

module.exports = loginRouter;

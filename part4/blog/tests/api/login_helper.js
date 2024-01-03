const jwt = require('jsonwebtoken');
const paths = require('../../constants/paths');
const usersHelper = require('./users_helper');

const loginUser = {
  username: 'loginUsername',
  name: 'loginName',
  password: 'login123',
};
const wrongLoginUser = {
  ...loginUser,
  password: loginUser + '123',
};
const validToken = async (username) => {
  const user = await usersHelper.aUserInDb(username);
  const userForToken = {
    username: user.username,
    id: user.id,
  };
  const validToken = jwt.sign(userForToken, process.env.SECRET);
  return validToken;
};
const tokenUnmatchWithUsername = async (username) => {
  const user = await usersHelper.aUserInDb(username);
  const userForToken = {
    username: user.username + 'invalid',
    id: user.id + "invalid",
  };
  const tokenUnmatchWithUsername = jwt.sign(userForToken, process.env.SECRET);
  return tokenUnmatchWithUsername;
};
const malformedToken = 'malformedToken';
module.exports = {
  loginUser,
  wrongLoginUser,
  validToken,
  tokenUnmatchWithUsername,
  malformedToken,
};

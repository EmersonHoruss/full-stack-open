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
const tokenOfAnotherUser = async (username) => {
  const users = await usersHelper.usersInDb();
  const anotherUser = users.find((user) => user.username !== username);
  const userForToken = {
    username: anotherUser.username,
    id: anotherUser.id,
  };
  const tokenOfAnotherUser = jwt.sign(userForToken, process.env.SECRET);
  return tokenOfAnotherUser;
};
const malformedToken = 'malformedToken';
module.exports = {
  loginUser,
  wrongLoginUser,
  validToken,
  tokenOfAnotherUser,
  malformedToken,
};

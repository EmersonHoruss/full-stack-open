const paths = require('../../constants/paths');

const loginUser = {
  username: 'loginUsername',
  name: 'loginName',
  password: 'login123',
};
const wrongLoginUser = {
  ...loginUser,
  password: loginUser + '123',
};
module.exports = {
  loginUser,
  wrongLoginUser,
};

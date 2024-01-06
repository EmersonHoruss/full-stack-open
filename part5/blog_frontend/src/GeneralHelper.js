const user = {
  username: "userTest",
  name: "nameTest",
  password: "passwordTest123",
};
const wronUser = {
  ...user,
  password: "wrongPassword",
};
const userLS = {
  username: user.username,
  token: "tokenTest",
  name: user.name,
};
const GeneralHelper = {
  userLS,
  user,
  wronUser,
};
export default GeneralHelper;

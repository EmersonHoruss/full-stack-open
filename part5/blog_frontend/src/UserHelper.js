const user = {
  username: "userTest",
  name: "nameTest",
  password: "passwordTest123",
};
const wronUser = {
  ...user,
  password: "wrongPassword",
};
const secondUser = {
  username: "userTest2",
  name: "nameTest2",
  password: "passwordTest1232",
};
const userLS = {
  username: user.username,
  token: "tokenTest",
  name: user.name,
};
const UserHelper = {
  user,
  wronUser,
  secondUser,
  userLS,
};
export default UserHelper;

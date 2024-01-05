const User = require('../../models/User');

const albertUser = {
  username: 'albert',
  name: 'Albert Camus',
  password: 'albert123',
};
const alanUser = {
  username: 'admin',
  name: 'García Perez, Alan',
  password: 'alan123',
};
const initialUsers = [albertUser, alanUser];
const unsavedUser = {
  username: 'unknow',
  name: 'unknow',
  password: 'unknow',
};
const nonExistingId = async () => {
  const user = new User(unsavedUser);
  await user.save();
  await user.deleteOne();
  return user._id.toString();
};
const usersInDb = async () => {
  const users = await User.find({}).populate('blogIds');
  return users.map((user) => user.toJSON());
};
const aUserInDb = async (username) => {
  const users = await User.find({ username }).populate('blogIds');
  return users.map((user) => user.toJSON())[0];
};
const getPassword = (username) => initialUsers.find((user) => user.username === username).password;
module.exports = {
  alanUser,
  albertUser,
  initialUsers,
  unsavedUser,
  nonExistingId,
  usersInDb,
  aUserInDb,
  getPassword,
};

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  name: { type: String },
  password: { type: String },
});
userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});
const User = mongoose.model('User', userSchema);
module.exports = User;

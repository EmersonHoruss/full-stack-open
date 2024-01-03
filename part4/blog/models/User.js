const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validationMessages = require('./userValidationMessages');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, validationMessages.username.required],
    minLength: [3, validationMessages.username.minLength],
    unique: validationMessages.username.unique,
  },
  name: { type: String },
  password: { type: String },
  blogIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});
userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
    returnedObject.blogs = returnedObject.blogIds;
    delete returnedObject.blogIds;
  },
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = User;

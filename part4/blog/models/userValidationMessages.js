const userValidationMessages = {
  username: {
    required: 'username is required',
    minLength: 'username must have at least 3 characters',
    unique: 'already exists other user with the same username',
  },
  password: {
    required: 'password is required',
    minLength: 'password must have at least 3 characters',
  },
};
module.exports = userValidationMessages;

const mongoose = require('mongoose');
const validationMessages = require('./blogValidationMessages');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, validationMessages.title.required],
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    required: [true, validationMessages.url.required],
  },
  likes: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    returnedObject.user = returnedObject.userId
    delete returnedObject.userId
  },
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

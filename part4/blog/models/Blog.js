const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    required: [true, 'url is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
});
blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

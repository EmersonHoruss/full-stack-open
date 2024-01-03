const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const blogValidationMessages = require('../models/blogValidationMessages');
const loginValidationMessages = require('../models/loginValidationMessages');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('userId');
  response.json(blogs);
});
router.post('/', async (request, response) => {
  const user = request.user;

  const blog = new Blog({ ...request.body, userId: user.id });
  logger.info('blog request body: ', blog);

  const savedBlog = await blog.save();
  logger.info('saved blog in db', savedBlog);

  user.blogIds = user.blogIds.concat(savedBlog._id);
  const savedUser = await user.save();

  response.status(201).json(savedBlog);
});
router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    response.status(204).end();
  }
  if (!request.token) {
    response.status(401).json({ error: loginValidationMessages.forgottenToken });
  }
  if (request.user.id.toString() !== blog.userId.toString()) {
    return response.status(401).json({ error: blogValidationMessages.invalidDeletation });
  }
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});
router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.status(200).json(updatedBlog);
});
module.exports = router;

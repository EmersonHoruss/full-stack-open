const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const loginValidationMessages = require('../models/loginValidationMessages');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('userId');
  response.json(blogs);
});
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};
router.post('/', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: loginValidationMessages.invalidToken });
  }
  const user = await User.findById(decodedToken.id);

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

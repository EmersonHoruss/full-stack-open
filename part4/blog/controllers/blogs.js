const router = require('express').Router();
const Blog = require('../models/Blog');
const logger = require('../utils/logger');

router.get('/', async (_, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});
router.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  logger.info('blog request body: ', blog);
  const savedBlog = await blog.save();
  logger.info('saved blog in db', savedBlog);
  response.status(201).json(savedBlog);
});
module.exports = router;

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

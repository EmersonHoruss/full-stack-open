const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const helper = require('./test_helper');
const logger = require('../utils/logger');

const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
describe('API: get all blogs:', () => {
  test('response should be json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('length should be correct', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test('blog should has id property and not _id', async () => {
    const response = await api.get('/api/blogs');
    console.log(response.body[0]);
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).toBeUndefined();
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

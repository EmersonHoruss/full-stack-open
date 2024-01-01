const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const helper = require('./test_helper');

const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
describe('Blog API', () => {
  describe('get all:', () => {
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
      expect(response.body[0].id).toBeDefined();
      expect(response.body[0]._id).toBeUndefined();
    });
  });
  describe('save:', () => {
    test('valid blog should be added correctly', async () => {
      const response = await api
        .post('/api/blogs')
        .send(helper.aBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const titleBlogs = (await helper.blogsInDb()).map((blog) => blog.title);
      expect(titleBlogs).toHaveLength(++helper.initialBlogs.length);
      expect(titleBlogs).toContain(response.body.title);
    });
    test('if likes is missing should be 0 automatically', async () => {
      const blogToSave = _.clone(helper.aBlog);
      delete blogToSave.likes;
      expect(blogToSave.likes).toBeUndefined();
      const response = await api
        .post('/api/blogs')
        .send()
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const titleBlogs = (await helper.blogsInDb()).map((blog) => blog.title);
      expect(titleBlogs).toHaveLength(++helper.initialBlogs.length);
      expect(titleBlogs).toContain(response.body.title);
      expect(response.body.likes).toBe(0);
    });
    test('if title or url are missing should not save', async () => {
      let blog = _.clone(helper.aBlog);
      delete blog.title;
      expect(blog.title).toBeUndefined();
      await api.post('/api/blogs').send(blog).expect(400);

      blog = _.clone(helper.aBlog);
      delete blog.url;
      expect(blog.url).toBeUndefined();
      await api.post('/api/blogs').send(blog).expect(400);

      const blogs = await helper.blogsInDb();
      expect(blogs.length).toBe(helper.initialBlogs.length);
    });
  });
  describe('delete:', () => {
    test('if id is correct should response with 204', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const { id, title } = blogsAtStart[0];
      await api.delete(`/api/blogs/${id}`).expect(204);
      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(--helper.initialBlogs.length);
      const titleBlogs = blogsAtEnd.map((blog) => blog.title);
      expect(titleBlogs).not.toContain(title);
    });
    test('when id is incorrect should response with 204', async () => {
      const wrongId = await helper.nonExistingId();
      await api.delete(`/api/blogs/${wrongId}`).expect(204);
      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const idBlogs = blogsAtEnd.map((blog) => blog.id);
      expect(idBlogs).not.toContain(wrongId);
    });
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

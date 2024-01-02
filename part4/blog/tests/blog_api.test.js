const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const helper = require('./blogs_helper');
const paths = require('../constants/paths');

const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
describe('Blog API', () => {
  describe('get all blogs:', () => {
    test('response should be json', async () => {
      await api
        .get(paths.blogs)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('length should be correct', async () => {
      const response = await api.get(paths.blogs);
      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });
    test('blog should has id property and not _id', async () => {
      const response = await api.get(paths.blogs);
      expect(response.body[0].id).toBeDefined();
      expect(response.body[0]._id).toBeUndefined();
    });
  });
  describe('save a blog:', () => {
    test('valid blog should be added correctly', async () => {
      const response = await api
        .post(paths.blogs)
        .send(helper.aBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const titleBlogs = (await helper.blogsInDb()).map((blog) => blog.title);
      expect(titleBlogs).toHaveLength(helper.initialBlogs.length + 1);
      expect(titleBlogs).toContain(response.body.title);
    });
    test('if likes is missing should be 0 automatically', async () => {
      const blog = _.clone(helper.aBlog);
      delete blog.likes;
      expect(blog.likes).toBeUndefined();
      const responseOfSave = await api
        .post(paths.blogs)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const blogsAtEnd = await helper.blogsInDb();
      const titleBlogs = blogsAtEnd.map((blog) => blog.title);
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      const { title, likes } = responseOfSave.body;
      expect(titleBlogs).toContain(title);
      expect(likes).toBe(0);
    });
    test('if title or url are missing should not save', async () => {
      let blog = _.clone(helper.aBlog);
      delete blog.title;
      expect(blog.title).toBeUndefined();
      await api.post(paths.blogs).send(blog).expect(400);

      blog = _.clone(helper.aBlog);
      delete blog.url;
      expect(blog.url).toBeUndefined();
      await api.post(paths.blogs).send(blog).expect(400);

      const blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.initialBlogs.length);
    });
  });
  describe('delete a blog:', () => {
    test('if id is correct should response with 204', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const { id, title } = blogsAtStart[0];
      await api.delete(`/api/blogs/${id}`).expect(204);
      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
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
  describe('update a blog:', () => {
    test('valid blog should be added correctly', async () => {
      const aBlog = await helper.aBlogInDb();
      const { id } = aBlog;
      delete aBlog.id;
      aBlog.likes = 100;
      const response = await api
        .put(`/api/blogs/${id}`)
        .send(aBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const likeBlogs = (await helper.blogsInDb()).map((blog) => blog.likes);
      expect(likeBlogs).toHaveLength(helper.initialBlogs.length);
      expect(likeBlogs).toContain(response.body.likes);
    });
    test('if title or url are missing should not update', async () => {
      let aBlog = await helper.aBlogInDb();
      const { id } = aBlog;
      delete aBlog.id;
      aBlog.title = null;
      await api
        .put(`/api/blogs/${id}`)
        .send(aBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const noUpdateBlog = await helper.aBlogInDb();
      expect(noUpdateBlog.title).toBe(helper.mythBlog.title);

      aBlog = await helper.aBlogInDb();
      delete aBlog.id;
      aBlog.url = null;
      await api
        .put(`/api/blogs/${id}`)
        .send(aBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(noUpdateBlog.url).toBe(helper.mythBlog.url);
    });
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

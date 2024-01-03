const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../../app');
const Blog = require('../../models/Blog');
const User = require('../../models/User');
const blogsHelper = require('./blogs_helper');
const usersHelper = require('./users_helper');
const loginHelper = require('./login_helper');
const paths = require('../../constants/paths');
const validationMessages = require('../../models/blogValidationMessages');
const blogValidationMessages = require('../../models/blogValidationMessages');
const loginValidationMessages = require('../../models/loginValidationMessages');

const api = supertest(app);
beforeEach(async () => {
  await User.deleteMany({});
  const userPromiseArray = usersHelper.initialUsers.map((user) => api.post(paths.users).send(user));
  const savedUsers = (await Promise.all(userPromiseArray)).map((response) => response.body);

  const tokenPromiseArray = usersHelper.initialUsers.map((user) =>
    api.post(paths.login).send(user)
  );
  const tokens = (await Promise.all(tokenPromiseArray)).map((response) => response.body);

  await Blog.deleteMany({});
  const blogObjects = blogsHelper.initialBlogs.map((blog) => {
    const username = blogsHelper.getUsernameOfABlog(blog.title);
    const user = savedUsers.find((user) => user.username === username);
    blog.userId = user.id;
    return blog;
  });
  const blogPromiseArray = blogObjects.map((blog) => {
    const username = blogsHelper.getUsernameOfABlog(blog.title);
    const token = tokens.find((token) => token.username === username).token;
    return api.post(paths.blogs).set('authorization', `Bearer ${token}`).send(blog);
  });
  await Promise.all(blogPromiseArray);
});
describe('Blog API', () => {
  describe('get all blogs:', () => {
    test('blogs response should be json', async () => {
      await api
        .get(paths.blogs)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('blogs length should be correct', async () => {
      const response = await api.get(paths.blogs);
      expect(response.body).toHaveLength(blogsHelper.initialBlogs.length);
    });
    test('blogs should has id property and not _id', async () => {
      const response = await api.get(paths.blogs);
      expect(response.body[0].id).toBeDefined();
      expect(response.body[0]._id).toBeUndefined();
    });
    test('blogs should has populated user', async () => {
      const response = await api
        .get(paths.blogs)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const randomBlog = response.body[0];
      expect(randomBlog.user).toBeDefined();
    });
  });
  describe('save a blog:', () => {
    test('valid blog should be added correctly', async () => {
      const user = (await api.post(paths.users).send(usersHelper.unsavedUser)).body;
      const token = (await api.post(paths.login).send(usersHelper.unsavedUser)).body.token;
      const blogToSave = _.clone(blogsHelper.unsavedBlog);
      blogToSave.userId = user.id;
      const savedBlogResponse = await api
        .post(paths.blogs)
        .set('authorization', `Bearer ${token}`)
        .send(blogToSave)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const titleBlogs = (await blogsHelper.blogsInDb()).map((blog) => blog.title);
      expect(titleBlogs).toHaveLength(blogsHelper.initialBlogs.length + 1);
      const { title } = savedBlogResponse.body;
      expect(titleBlogs).toContain(title);

      const updatedUser = await usersHelper.aUserInDb(user.username);
      const userTitleBlogs = updatedUser.blogs.map((blog) => blog.title);
      expect(userTitleBlogs).toContain(title);
    });
    test('blog without likes should be saved and likes should be automatically set to 0', async () => {
      const user = (await api.post(paths.users).send(usersHelper.unsavedUser)).body;
      const token = (await api.post(paths.login).send(usersHelper.unsavedUser)).body.token;
      const blogToSave = _.clone(blogsHelper.unsavedBlog);
      blogToSave.userId = user.id;
      delete blogToSave.likes;
      expect(blogToSave.likes).toBeUndefined();
      const savedBlogResponse = await api
        .post(paths.blogs)
        .set('authorization', `Bearer ${token}`)
        .send(blogToSave)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const titleBlogs = (await blogsHelper.blogsInDb()).map((blog) => blog.title);
      expect(titleBlogs).toHaveLength(blogsHelper.initialBlogs.length + 1);
      const { title, likes, id } = savedBlogResponse.body;
      expect(titleBlogs).toContain(title);
      expect(likes).toBe(0);

      const updatedUser = await usersHelper.aUserInDb(user.username);
      const userTitleBlogs = updatedUser.blogs.map((blog) => blog.title);
      expect(userTitleBlogs).toContain(title);
    });
    test('blog without title should not save', async () => {
      const user = (await api.post(paths.users).send(usersHelper.unsavedUser)).body;
      const token = (await api.post(paths.login).send(usersHelper.unsavedUser)).body.token;
      const blogToSave = _.clone(blogsHelper.unsavedBlog);
      blogToSave.userId = user.id;
      delete blogToSave.title;
      expect(blogToSave.title).toBeUndefined();
      const response = await api
        .post(paths.blogs)
        .set('authorization', `Bearer ${token}`)
        .send(blogToSave)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(response.body.error).toBe(validationMessages.title.required);
      const blogs = await blogsHelper.blogsInDb();
      expect(blogs).toHaveLength(blogsHelper.initialBlogs.length);

      const updatedUser = await usersHelper.aUserInDb(user.username);
      expect(updatedUser.blogs).toHaveLength(user.blogs.length);
    });
    test('blog without url should not save', async () => {
      const user = (await api.post(paths.users).send(usersHelper.unsavedUser)).body;
      const token = (await api.post(paths.login).send(usersHelper.unsavedUser)).body.token;
      const blogToSave = _.clone(blogsHelper.unsavedBlog);
      blogToSave.userId = user.id;
      delete blogToSave.url;
      expect(blogToSave.url).toBeUndefined();
      const response = await api
        .post(paths.blogs)
        .set('authorization', `Bearer ${token}`)
        .send(blogToSave)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(response.body.error).toBe(validationMessages.url.required);
      const blogs = await blogsHelper.blogsInDb();
      expect(blogs).toHaveLength(blogsHelper.initialBlogs.length);

      const updatedUser = await usersHelper.aUserInDb(user.username);
      expect(updatedUser.blogs).toHaveLength(user.blogs.length);
    });
  });
  describe('delete a blog:', () => {
    test('if id is correct should response with 204', async () => {
      const blogsAtStart = await blogsHelper.blogsInDb();
      const { id, title, user } = blogsAtStart[0];
      const token = await loginHelper.validToken(user.username);
      await api.delete(`/api/blogs/${id}`).set('authorization', `Bearer ${token}`).expect(204);
      const blogsAtEnd = await blogsHelper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length - 1);
      const titleBlogs = blogsAtEnd.map((blog) => blog.title);
      expect(titleBlogs).not.toContain(title);
    });
    test('when id is incorrect should response with 204', async () => {
      const wrongId = await blogsHelper.nonExistingId();
      await api.delete(`/api/blogs/${wrongId}`).expect(204);
      const blogsAtEnd = await blogsHelper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length);
      const idBlogs = blogsAtEnd.map((blog) => blog.id);
      expect(idBlogs).not.toContain(wrongId);
    });
    test('if token is forgotten so server responses with 401', async () => {
      const blogsAtStart = await blogsHelper.blogsInDb();
      const { id, title } = blogsAtStart[0];
      const response = await api.delete(`/api/blogs/${id}`).expect(401);
      expect(response.body.error).toBe(loginValidationMessages.forgottenToken);
      const blogsAtEnd = await blogsHelper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length);
      const titleBlogs = blogsAtEnd.map((blog) => blog.title);
      expect(titleBlogs).toContain(title);
    });
    test('if token is malformed so server responses with 401', async () => {
      const blogsAtStart = await blogsHelper.blogsInDb();
      const { id, title } = blogsAtStart[0];
      const token = loginHelper.malformedToken;
      const response = await api
        .delete(`/api/blogs/${id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(401);
      expect(response.body.error).toBe(loginValidationMessages.malformedToken);
      const blogsAtEnd = await blogsHelper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length);
      const titleBlogs = blogsAtEnd.map((blog) => blog.title);
      expect(titleBlogs).toContain(title);
    });
    // test('if token is of another user so server responses with 401', async () => {
    //   const blogsAtStart = await blogsHelper.blogsInDb();
    //   const { id, title,user } = blogsAtStart[0];
    //   const token = await loginHelper.tokenUnmatchWithUsername(user.username);
    //   console.log(token)
    //   const response = await api
    //     .delete(`/api/blogs/${id}`)
    //     .set('authorization', `Bearer ${token}`)
    //     .expect(401);
    //   expect(response.body.error).toBe(blogValidationMessages.invalidDeletation);
    //   const blogsAtEnd = await blogsHelper.blogsInDb();
    //   expect(blogsAtEnd).toHaveLength(blogsHelper.initialBlogs.length);
    //   const titleBlogs = blogsAtEnd.map((blog) => blog.title);
    //   expect(titleBlogs).toContain(title);
    // });
  });
  describe('update a blog:', () => {
    test('valid blog should be updated correctly', async () => {
      const aBlog = await blogsHelper.aBlogInDb();
      const { id } = aBlog;
      delete aBlog.id;
      aBlog.likes = 100;
      const response = await api
        .put(`/api/blogs/${id}`)
        .send(aBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/);
      const likeBlogs = (await blogsHelper.blogsInDb()).map((blog) => blog.likes);
      expect(likeBlogs).toHaveLength(blogsHelper.initialBlogs.length);
      expect(likeBlogs).toContain(response.body.likes);
    });
    test('if title or url are missing should not update', async () => {
      let aBlog = await blogsHelper.aBlogInDb();
      const { id } = aBlog;
      delete aBlog.id;
      aBlog.title = null;
      await api
        .put(`/api/blogs/${id}`)
        .send(aBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      const noUpdateBlog = await blogsHelper.aBlogInDb();
      expect(noUpdateBlog.title).toBe(blogsHelper.mythBlog.title);

      aBlog = await blogsHelper.aBlogInDb();
      delete aBlog.id;
      aBlog.url = null;
      await api
        .put(`/api/blogs/${id}`)
        .send(aBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
      expect(noUpdateBlog.url).toBe(blogsHelper.mythBlog.url);
    });
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

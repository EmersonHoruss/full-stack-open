const mongoose = require('mongoose');
const _ = require('lodash');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');
const helper = require('./users_helper');
const paths = require('../constants/paths');

const api = supertest(app);
beforeEach(async () => {
  await User.deleteMany({});
  const promiseArray = helper.initialUsers.map((user) => api.post(paths.users).send(user));
  await Promise.all(promiseArray);
});
describe('User API', () => {
  describe('get all users:', () => {
    test('response should be json', async () => {
      await api
        .get(paths.users)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
    test('length should be correct', async () => {
      const response = await api.get(paths.users);
      expect(response.body).toHaveLength(helper.initialUsers.length);
    });
    test('user should has id property and not _id', async () => {
      const response = await api.get(paths.users);
      expect(response.body[0].id).toBeDefined();
      expect(response.body[0]._id).toBeUndefined();
    });
    test('user should hide password property', async () => {
      const response = await api.get(paths.users);
      expect(response.body[0].password).toBeUndefined();
    });
  });
  describe('save a user:', () => {
    test('valid user should be added correctly', async () => {
      const response = await api
        .post(paths.users)
        .send(helper.unsavedUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      const nameUsers = (await helper.usersInDb()).map((user) => user.name);
      expect(nameUsers).toHaveLength(helper.initialUsers.length + 1);
      expect(nameUsers).toContain(response.body.name);
    });
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

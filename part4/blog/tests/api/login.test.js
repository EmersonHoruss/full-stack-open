const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const User = require('../../models/User');
const helper = require('./login_helper');
const paths = require('../../constants/paths');
const validationMessages = require('../../models/loginValidationMessages');

const api = supertest(app);
beforeEach(async () => {
  await api.post(paths.users).send(helper.loginUser);
});
describe('Login API', () => {
  test('successful login', async () => {
    const loginResponse = await api
      .post(paths.login)
      .send(helper.loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const { token, username, name } = loginResponse.body;
    expect(token).toBeDefined();
    expect(username).toBe(helper.loginUser.username);
    expect(name).toBe(helper.loginUser.name);
  });
  test('failed login', async () => {
    const loginResponse = await api
      .post(paths.login)
      .send(helper.wrongLoginUser)
      .expect(401)
      .expect('Content-Type', /application\/json/);
    expect(loginResponse.body.error).toBe(validationMessages.invalidUsernameOrPassword);
  });
});
afterEach(async () => {
  await User.deleteMany({});
});
afterAll(async () => {
  await mongoose.connection.close();
});

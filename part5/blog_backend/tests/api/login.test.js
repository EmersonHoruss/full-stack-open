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
  test('if token is malformed so server responses 401', async () => {
    const token = helper.malformedToken;
    const response = await api
      .post(`${paths.login}/malformedToken`)
      .set('authorization', `Bearer ${token}`)
      .expect(401);
    expect(response.body.error).toBe(validationMessages.malformedToken);
  });
  test('if token and username does not match so server responses 400', async () => {
    const token = await helper.tokenUnmatchWithUsername(helper.loginUser.username);
    const response = await api
      .post(`${paths.login}/tokenMatchWithUsername`)
      .set('authorization', `Bearer ${token}`)
      .send(helper.loginUser)
      .expect(400);
    expect(response.body.error).toBe(validationMessages.tokenUnmatchWithUsername);
  });
  test('if token and username match so server responses 200', async () => {
    const token = await helper.validToken(helper.loginUser.username);
    await api
      .post(`${paths.login}/tokenMatchWithUsername`)
      .set('authorization', `Bearer ${token}`)
      .send(helper.loginUser)
      .expect(200);
  });
});
afterEach(async () => {
  await User.deleteMany({});
});
afterAll(async () => {
  await mongoose.connection.close();
});

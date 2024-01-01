require('dotenv').config();

const { PORT } = process.env;
let { MONGODB_URI } = process.env;
MONGODB_URI =
  process.env.NODE_TEST === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const config = {
  MONGODB_URI,
  PORT,
};
module.exports = config;

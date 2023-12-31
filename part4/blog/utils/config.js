require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;
const config = {
  MONGODB_URI,
  PORT,
};
module.exports = config;

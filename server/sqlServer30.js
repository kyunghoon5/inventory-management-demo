const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  PORT3,
  HOST3,
  HOST_URL3,
  SQL_USER3,
  SQL_PASSWORD3,
  SQL_DATABASE3,
  SQL_SERVER3,
} = process.env;

const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

assert(PORT3, 'PORT is require');
assert(HOST3, 'HOST is required');

module.exports = {
  server: SQL_SERVER3,
  database: SQL_DATABASE3,
  user: SQL_USER3,
  password: SQL_PASSWORD3,
  options: {
    encrypt: false,
    enableArithAbort: true,
    truestConnection: true,
  },
  requestTimeout: 300000,
};

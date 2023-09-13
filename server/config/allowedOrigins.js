require('dotenv').config();

const allowedOrigins = [
  process.env.BACKEND_SERVER,
  process.env.FRONTEND_SERVER,
];

module.exports = allowedOrigins;

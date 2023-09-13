const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token

    // Extract the desired information from the decoded JWT token
    const user = decoded.user;

    // Add the extracted information to the request object
    req.user = { user };

    next();
  });
};

module.exports = verifyJWT;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const eventData = require('../data/events/index');

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  const usernames = await eventData.getEvents();
  const duplicate = usernames.find((obj) => obj.username === username);

  if (!duplicate) {
    return res.status(401).send('Unauthorized');
  }

  const match = await bcrypt.compare(password, duplicate.password);

  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      {
        username: duplicate.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      {
        username: duplicate.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    duplicate.refreshToken = refreshToken;

    const updated = await eventData.saveRefreshToken(
      duplicate.username,
      refreshToken
    );

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });
 
console.log('Cookies: ', res._headers['set-cookie']);
    // Send authorization roles and access token to user
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  handleLogin,
};

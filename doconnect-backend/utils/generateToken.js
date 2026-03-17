const jwt = require('jsonwebtoken');

const generateToken = (id, roleId) => {
  return jwt.sign({ id, roleId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

module.exports = generateToken;
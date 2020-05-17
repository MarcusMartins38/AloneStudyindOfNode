const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
  async execute(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error('JWT token is missing');
    }

    const [bearer, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded;

      req.user = {
        id: sub,
      };

      return next();
    } catch (err) {
      throw new Error('Invalid JWT token');
    }
  },
};

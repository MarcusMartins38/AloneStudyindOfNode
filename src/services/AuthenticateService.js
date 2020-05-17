const { compare } = require('bcryptjs');
const User = require('../models/User');
const { sign } = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = {
  async create(email, password) {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect Email or Password');
    }

    const comparedPassword = compare(user.password, password);

    if (!comparedPassword) {
      throw new Error('Incorrect Email or Password');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  },
};

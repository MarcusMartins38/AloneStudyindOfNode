const AuthenticateService = require('../services/AuthenticateService');

module.exports = {
  async create(req, res) {
    const { email, password } = req.body;
    try {
      const { user, token } = await AuthenticateService.create(email, password);

      delete user.password;

      return res.json({ user, token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};

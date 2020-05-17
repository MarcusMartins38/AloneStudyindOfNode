const { hash } = require('bcryptjs');
const { uuid } = require('uuidv4');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const getAllUsers = await User.findAll();

    return res.json(getAllUsers);
  },

  async store(req, res) {
    const { name, email, password, phone, uf } = req.body;

    const findUserByEmail = await User.findOne({
      where: { email },
    });

    if (findUserByEmail) {
      return res.status(500).send('Já existe um usuario com esse E-mail');
    }

    const hashedPassword = await hash(password, 8);

    const user = await User.create({
      id: uuid(),
      name,
      email,
      password: hashedPassword,
      phone,
      uf,
    });

    delete user.password;

    return res.json(user);
  },
};

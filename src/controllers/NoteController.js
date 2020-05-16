const { uuid } = require('uuidv4');

const User = require('../models/User');
const Note = require('../models/Note');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'notes' },
    });

    if (!user) {
      return res.status(400).json('User not exist');
    }

    return res.json(user);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { case_title, description, help } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const note = await Note.create({
      id: uuid(),
      case_title,
      description,
      help,
      user_id,
    });

    return res.json(note);
  },
};

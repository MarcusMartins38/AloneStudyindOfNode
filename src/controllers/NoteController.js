const { uuid } = require('uuidv4');

const User = require('../models/User');
const Note = require('../models/Note');

module.exports = {
  async index(req, res) {
    //id it's the user_id
    const { id } = await req.user;

    const user = await User.findByPk(id, {
      include: { association: 'notes' },
    });

    if (!user) {
      return res.status(400).json('User not exist');
    }

    return res.json(user.notes);
  },

  async store(req, res) {
    //id it's the user_id
    const { id } = await req.user;
    const { case_title, description, help } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user_id = id;

    const note = await Note.create({
      id: uuid(),
      case_title,
      description,
      help,
      user_id,
    });

    return res.json(note);
  },

  async remove(req, res) {
    const { id } = req.params;

    const noteFind = await Note.findByPk(id);

    if (!noteFind) {
      throw new Error('This note not exists');
    }

    await Note.destroy({ where: { id } });

    return res.send();
  },
};

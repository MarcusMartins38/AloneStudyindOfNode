const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Note = require('../models/Note');

const connection = new Sequelize(dbConfig);

User.init(connection);
Note.init(connection);

User.associate(connection.models);
Note.associate(connection.models);

module.exports = connection;

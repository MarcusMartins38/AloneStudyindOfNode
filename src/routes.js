const express = require('express');
const UserController = require('./controllers/UserController');
const NoteController = require('./controllers/NoteController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/users/:user_id/notes', NoteController.index);
routes.post('/users/:user_id/notes', NoteController.store);

module.exports = routes;

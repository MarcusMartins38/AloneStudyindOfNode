const express = require('express');
const UserController = require('./controllers/UserController');
const NoteController = require('./controllers/NoteController');
const AuthenticateController = require('./controllers/AuthenticateController');
const ensureAuth = require('./middlewares/ensureAuthenticate');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/sessions', AuthenticateController.create);

routes.get('/notes', ensureAuth.execute, NoteController.index);
routes.post('/notes', ensureAuth.execute, NoteController.store);
routes.delete('/notes/:id', ensureAuth.execute, NoteController.remove);

module.exports = routes;

import express from 'express';
import users from './routes/user';
import projects from './routes/project';
import tasks from './routes/task';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/users', users);
    this.server.use('/projects', projects);
    this.server.use('/tasks', tasks);
  }
}

export default new App().server;

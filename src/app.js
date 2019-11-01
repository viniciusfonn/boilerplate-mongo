import express from 'express';
import routes from './routes';
import users from './routes/user';

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
    this.server.use(routes);
    this.server.use('/users', users);
  }
}

export default new App().server;

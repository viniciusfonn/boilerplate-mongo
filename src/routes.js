import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', (req, res) => {
  res.send('olá dev');
});

export default routes;

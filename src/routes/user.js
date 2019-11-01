import { Router } from 'express';

// import authMiddleware from './app/middlewares/auth';
import UserController from '../app/controllers/UserController';

const routes = new Router();

routes.get('/', UserController.index);
routes.post('/', UserController.store);

routes.get('/:id', UserController.show);
routes.put('/:id', UserController.update);
routes.delete('/:id', UserController.delete);

export default routes;

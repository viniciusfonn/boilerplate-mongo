import { Router } from 'express';

// import authMiddleware from './app/middlewares/auth';
import UserController from '../app/controllers/UserController';

const users = new Router();

users.get('/', UserController.index);
users.post('/', UserController.store);

users.get('/:id', UserController.show);
users.put('/:id', UserController.update);
users.delete('/:id', UserController.delete);

export default users;

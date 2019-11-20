import { Router } from 'express';

// import authMiddleware from './app/middlewares/auth';
import TaskController from '../app/controllers/TaskController';

const tasks = new Router();

tasks.get('/', TaskController.index);
tasks.post('/', TaskController.store);

tasks.get('/:id', TaskController.show);
tasks.put('/:id', TaskController.update);
tasks.delete('/:id', TaskController.delete);

export default tasks;

import { Router } from 'express';

// import authMiddleware from './app/middlewares/auth';
import ProjectController from '../app/controllers/ProjectController';

const projects = new Router();

projects.get('/', ProjectController.index);
projects.post('/', ProjectController.store);

projects.get('/:id', ProjectController.show);
projects.put('/:id', ProjectController.update);
projects.delete('/:id', ProjectController.delete);

export default projects;

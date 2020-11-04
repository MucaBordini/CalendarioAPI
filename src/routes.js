import { Router } from 'express';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';
import EventController from './controllers/EventController';

import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store); 
routes.post('/sessions', SessionController.store);


//routes.get('/cases', CaseController.showCases);

routes.use(authMiddleware);

routes.get('/auth', SessionController.verification);

routes.post('/events', EventController.store);

routes.delete('/events', EventController.delete);

routes.put('/events', EventController.edit);

routes.get('/events', EventController.showEvents);

/*routes.get('/authenticated', (req, res) => res.send('Ok'));
routes.get('/clear', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('user');
    res.send('cookies cleared');
})*/

export default routes;
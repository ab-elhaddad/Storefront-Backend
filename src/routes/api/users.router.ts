import express from 'express';
import { destroy } from '../../handlers/users.handler';
import {
  authenticate,
  create,
  index,
  show,
} from '../../handlers/users.handler';
import authToken from '../../middlewares/authToken.middleware';

const usersRoutes = (app: express.Application): void => {
  app.get('/users/auth', authenticate);
  app.get('/users/:id', authToken, show);
  app.get('/users', authToken, index);
  app.post('/users', create);
  app.delete('/users/:id', destroy);
};
export default usersRoutes;

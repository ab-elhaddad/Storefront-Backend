import express from 'express';
import {
  completedOrders,
  create,
  currentOrder,
  destroy,
  index,
  show,
} from '../../handlers/orders.handler';
import authToken from '../../middlewares/authToken.middleware';

const ordersRoutes = (app: express.Application): void => {
  app.get('/orders', authToken, index);
  app.get('/orders/:id', authToken, show);
  app.delete('/orders/:id', authToken, destroy);
  app.post('/orders', authToken, create);
  app.get('/orders/currentOrder/:id', authToken, currentOrder);
  app.get('/orders/completedOrders/:id', authToken, completedOrders);
};
export default ordersRoutes;

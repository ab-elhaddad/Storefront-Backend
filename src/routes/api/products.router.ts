import express from 'express';
import {
  create,
  destroy,
  index,
  show,
  updatePrice,
} from '../../handlers/products.handler';
import authToken from '../../middlewares/authToken.middleware';

const productsRoutes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', authToken, create);
  app.delete('/products/:id', authToken, destroy);
  app.patch('/products/updatePrice/:id', authToken, updatePrice);
};
export default productsRoutes;

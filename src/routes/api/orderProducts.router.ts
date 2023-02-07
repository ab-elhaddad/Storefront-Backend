import express from 'express';
import { addProductToOrder } from '../../handlers/orderProducts.handler';
import authToken from '../../middlewares/authToken.middleware';

const orderProductsRoutes = (app: express.Application): void => {
  app.post('/orders/addProduct', authToken, addProductToOrder);
};

export default orderProductsRoutes;

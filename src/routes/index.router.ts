import express from 'express';
import productsRoutes from './api/products.router';
import ordersRoutes from './api/orders.router';
import usersRoutes from './api/users.router';
import orderProductsRoutes from './api/orderProducts.router';

const mainRouter = (app: express.Application) => {
  usersRoutes(app);
  productsRoutes(app);
  ordersRoutes(app);
  orderProductsRoutes(app);
};

export default mainRouter;

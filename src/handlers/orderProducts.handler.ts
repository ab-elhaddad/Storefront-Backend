import { OrderProducts } from '../models/orderProducts.model';
import { OrderProduct } from '../types/orderProduct.type';
import { Request, Response } from 'express';

const orderProducts = new OrderProducts();

export const addProductToOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entered: OrderProduct = {
      quantity: Number(req.body.quantity),
      order_id: Number(req.body.order_id),
      product_id: Number(req.body.product_id),
    };
    const result = await orderProducts.addProductToOrder(entered);
    res.json({
      Message: 'Producted added to the order successfully :)',
      data: result,
    });
  } catch (e) {
    throw new Error(
      `Error in addProductToOrder function in OrderProducts handler\n${e}`
    );
  }
};

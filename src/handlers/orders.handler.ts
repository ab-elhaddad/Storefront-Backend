import { Orders } from '../models/orders.model';
import { Request, Response } from 'express';
import { Order } from '../types/order.type';

const orders = new Orders();

export const create = async (req: Request, res: Response) => {
  try {
    const entered: Order = {
      user_id: Number(req.body.user_id),
      status: req.body.status,
    };
    const result = await orders.create(entered);
    res.json({
      Message: 'Order created successfully :)',
      data: result,
    });
  } catch (e) {
    throw new Error(`Error in create function in orders handler.\n${e}`);
  }
};

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await orders.index();
    res.json(result);
  } catch (e) {
    throw new Error(`Error in index function in orders handler.\n${e}`);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const entered = req.body.id || Number(req.params.id);
    const result = await orders.show(entered);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in show function in orders handler.\n${e}`);
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.body.id || Number(req.params.id);
    const result = await orders.destroy(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in destroy function in orders handler.\n${e}`);
  }
};

export const currentOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entered = req.body.id || Number(req.params.id);
    const result = await orders.currentOrder(entered);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in currentOrder function in orders handler.\n${e}`);
  }
};

export const completedOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entered = req.body.id | Number(req.params.id);
    const result = await orders.completedOrders(entered);
    res.json(result);
  } catch (e) {
    throw new Error(
      `Error in completedOrders function in orders handler.\n${e}`
    );
  }
};

import { Product } from '../types/product.type';
import { Products } from '../models/products.model';
import { Request, Response } from 'express';

const products = new Products();

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await products.index();
    res.json(result);
  } catch (e) {
    throw new Error(`Error in index function in products handler.\n${e}`);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const entered = req.body.id | Number(req.params.id);
    const result = await products.show(entered);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in show function in products handler.\n${e}`);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const entered: Product = {
      name: req.body.name,
      price: Number(req.body.price),
    };
    const result = await products.create(entered);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in create function in products handler.\n${e}`);
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.body.id | Number(req.params.id);
    const result = await products.destroy(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in destroy function in products handler.\n${e}`);
  }
};

export const updatePrice = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.body.id) || Number(req.params.id);
    const newPrice = Number(req.body.newPrice);
    const result = await products.updatePrice(id, newPrice);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in updatePrice function in products handler.\n${e}`);
  }
};

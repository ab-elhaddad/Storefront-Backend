import { Users } from '../models/users.model';
import { Request, Response } from 'express';
import { User } from '../types/user.type';

const users = new Users();

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await users.index();
    res.json(result);
  } catch (e) {
    throw new Error(`Error in index function in users handler file.\n${e}`);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const entered = req.body.id | Number(req.params.id);
    const result = await users.show(entered);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in show function in users handler file.\n${e}`);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const entered: User = {
      first_name: req.body.first_name as string,
      last_name: req.body.last_name as string,
      password: req.body.password as string,
    };
    const result = await users.create(entered);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in create function in users handler file.\n${e}`);
  }
};

export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = req.body.id || req.params.id;
    const result = await users.destroy(id);
    res.json(result);
  } catch (e) {
    throw new Error(`Error in destroy function in users handler file.\n${e}`);
  }
};

export const authenticate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const entered: User = {
      first_name: req.body.first_name as string,
      last_name: req.body.last_name as string,
      password: req.body.password as string,
    };

    const result = await users.authenticate(entered);
    res.json(result);
  } catch (e) {
    throw new Error(
      `Error in authenticate function in users handler file.\n${e}`
    );
  }
};

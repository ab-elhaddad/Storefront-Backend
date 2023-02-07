import express from 'express';
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import config from '../configuration/config';

const authToken = express.Router();

authToken.use((req: Request, res: Response, next: NextFunction) => {
  try {
    const header =
      (req.headers.authorization as string) || req.body.authorization;
    const token = header.split(' ')[1];
    JWT.verify(token, config.secretKey as string);
    next();
  } catch (e) {
    res.status(400).json('Invalid token');
  }
});

export default authToken;

import { User } from '../types/user.type';
import client from '../database';
import bcrypt from 'bcrypt';
import config from '../configuration/config';
import JWT from 'jsonwebtoken';

export class Users {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT id, first_name, last_name FROM users';
      const res = await connection.query(sql);
      connection.release();
      return res.rows;
    } catch (e) {
      throw new Error(`Error in index function in Users class\n${e}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT id, first_name, last_name FROM users WHERE id=($1)';
      const res = await client.query(sql, [id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in show function in Users class\n${e}`);
    }
  }

  async create(u: User): Promise<string> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES ($1,$2,$3) RETURNING *';
      const plainPassword = u.password as string;
      const hashedPassword = bcrypt.hashSync(
        plainPassword,
        Number(config.salt)
      );

      const res = await connection.query(sql, [
        u.first_name,
        u.last_name,
        hashedPassword,
      ]);
      connection.release();

      const entered: User = {
        first_name: res.rows[0].first_name,
        last_name: res.rows[0].last_name,
      };
      const token = JWT.sign(entered, config.secretKey as string);
      return token;
    } catch (e) {
      throw new Error(`Error in create function in Users class\n${e}`);
    }
  }

  async destroy(id: number): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'DELETE FROM users WHERE id=($1) RETURNING id,first_name,last_name';
      const res = await connection.query(sql, [id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in destroy function in Users class\n${e}`);
    }
  }

  async authenticate(u: User): Promise<string> {
    try {
      const connection = await client.connect();
      const sql =
        'SELECT * FROM users WHERE first_name=($1) AND last_name=($2)';
      const res = await connection.query(sql, [u.first_name, u.last_name]);

      if (res.rowCount === 0) {
        return 'Wrong inputs';
      }

      const storedPassword = res.rows[0].password;
      const matched = bcrypt.compareSync(u.password as string, storedPassword);

      if (matched) {
        const entered: User = {
          first_name: res.rows[0].first_name,
          last_name: res.rows[0].last_name,
        };
        const token = JWT.sign(entered, config.secretKey as string);
        return token;
      } else {
        return 'Wrong Password';
      }
    } catch (e) {
      throw new Error(`Error in authenticate function in Users class\n${e}`);
    }
  }
}

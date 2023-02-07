import { Product } from '../types/product.type';
import client from '../database';

export class Products {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products';
      const res = await connection.query(sql);
      connection.release();
      return res.rows;
    } catch (e) {
      throw new Error(`Error in index function in Products class\n${e}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const res = await connection.query(sql, [id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in show function in Products class\n${e}`);
    }
  }

  async create(p: Product) {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO products (name, price) VALUES ($1,$2) RETURNING *';
      const res = await connection.query(sql, [p.name, p.price]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in create function in Products class\n${e}`);
    }
  }

  async destroy(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const res = await connection.query(sql, [id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in destroy function in products model.\n${e}`);
    }
  }

  async updatePrice(id: number, newPrice: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = 'UPDATE products SET price=($2) WHERE id=($1) RETURNING *';
      const res = await connection.query(sql, [id, newPrice]);
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in updatePrice function in products model.\n${e}`);
    }
  }
}

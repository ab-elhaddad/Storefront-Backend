import { Order } from '../types/order.type';
import client from '../database';

export class Orders {
  async create(o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1,$2) RETURNING *';
      const res = await connection.query(sql, [o.user_id, o.status]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in create function in Orders model\n${e}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders';
      const res = await connection.query(sql);
      connection.release();
      return res.rows;
    } catch (e) {
      throw new Error(`Error in index function in Orders class\n${e}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const res = await connection.query(sql, [id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in show function in Orders class\n${e}`);
    }
  }

  async destroy(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const res = await connection.query(sql, [id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in destroy function in Orders model.\n${e}`);
    }
  }

  async currentOrder(user_id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";
      const res = await connection.query(sql, [user_id]);
      connection.release();
      return res.rows[0];
    } catch (e) {
      throw new Error(`Error in currentOrder function in Orders class\n${e}`);
    }
  }

  async completedOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
      const res = await connection.query(sql, [user_id]);
      connection.release();
      return res.rows;
    } catch (e) {
      throw new Error(
        `Error in completedOrders function in Orders class\n${e}`
      );
    }
  }
}

import client from '../database';
import { OrderProduct } from '../types/orderProduct.type';

export class OrderProducts {
  async addProductToOrder(op: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1,$2,$3) RETURNING *';
      const res = await connection.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);
      return res.rows[0];
    } catch (e) {
      throw new Error(
        `Error in addProductToOrder function in OrderProducts model\n${e}`
      );
    }
  }
}

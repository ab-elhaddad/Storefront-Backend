import { Order } from '../../types/order.type';
import { Orders } from '../../models/orders.model';
import client from '../../database';

describe('Testing Orders Model', () => {
  beforeAll(async () => {
    const connection = await client.connect();
    const sql =
      "INSERT INTO users (id, first_name, last_name,password) VALUES (10,'test', 'test','test') ";
    await connection.query(sql);
  });

  beforeAll(async () => {
    const orders = new Orders();

    const order1: Order = {
      status: 'active',
      user_id: 10,
    };
    await orders.create(order1);

    const order2: Order = {
      status: 'complete',
      user_id: 10,
    };
    await orders.create(order2);
    await orders.create(order2);
  });

  describe('Testing Create Function', () => {
    it('Defined', () => {
      const orders = new Orders();
      expect(orders.create).toBeDefined();
    });

    it('Works', async () => {
      const orders = new Orders();

      const newOrder: Order = {
        status: 'active',
        user_id: 10,
      };
      const res = await orders.create(newOrder);

      expect(res).toEqual({ id: 4, ...newOrder });
    });
  });

  describe('Testing Current Order Function', () => {
    it('Defined', () => {
      const orders = new Orders();
      expect(orders.currentOrder).toBeDefined();
    });

    it('Works', async () => {
      const orders = new Orders();
      const res = await orders.currentOrder(10);

      const currOrder: Order = {
        id: 1,
        status: 'active',
        user_id: 10,
      };

      expect(res).toEqual(currOrder);
    });
  });

  describe('Testing Completed Orders Function', () => {
    it('Defined', () => {
      const orders = new Orders();
      expect(orders.completedOrders).toBeDefined();
    });

    it('Works', async () => {
      const orders = new Orders();
      const res = await orders.completedOrders(10);

      const completeOrder: Order = {
        status: 'complete',
        user_id: 10,
      };

      const expected = [
        { id: 2, ...completeOrder },
        { id: 3, ...completeOrder },
      ];
      expect(res).toEqual(expected);
    });
  });

  afterAll(async () => {
    const connection = await client.connect();
    let sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await connection.query(sql);
    sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });
});

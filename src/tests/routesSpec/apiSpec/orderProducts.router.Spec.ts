import client from '../../../database';
import app from '../../../server';
import supertest from 'supertest';
import { OrderProduct } from '../../../types/orderProduct.type';
import { Users } from './../../../models/users.model';
import { Products } from './../../../models/products.model';
import { Orders } from './../../../models/orders.model';

const request = supertest(app);
let token: string;

describe('Testing orderProducts Route', () => {
  beforeAll(async () => {
    const users = new Users();
    const products = new Products();
    const orders = new Orders();

    token = await users.create({
      first_name: 'Abdelrrahman',
      last_name: 'Elhaddad',
      password: '12345',
    });

    await products.create({
      name: 'Cocacola',
      price: 10,
    });

    await orders.create({
      status: 'active',
      user_id: 1,
    });
  });

  afterAll(async () => {
    const connection = await client.connect();

    let sql =
      'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
    await connection.query(sql);

    sql = 'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await connection.query(sql);

    sql =
      'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(sql);

    sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);

    connection.release();
  });

  describe('Testing addProductToOrder Function', () => {
    it('Should return the quntity, order_id and produuct_id', async () => {
      const entered: OrderProduct = {
        quantity: 5,
        order_id: 1,
        product_id: 1,
      };

      const res = await request
        .post('/orders/addProduct')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(entered);

      expect(res.body.data).toEqual({ id: 1, ...entered });
    });
  });
});

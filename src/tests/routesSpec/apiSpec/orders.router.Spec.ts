import client from '../../../database';
import supertest from 'supertest';
import app from '../../../server';
import { Order } from '../../../types/order.type';
import { Orders } from '../../../models/orders.model';
import { Users } from '../../../models/users.model';
import { before } from 'node:test';

const request = supertest(app);
let token: string;
const orders = new Orders();
const newOrder: Order = {
  status: 'active',
  user_id: 1,
};

describe('Testing Orders Route', () => {
  beforeAll(async () => {
    const users = new Users();
    token = await users.create({
      first_name: 'Abdelrrahman',
      last_name: 'Elhaddad',
      password: '123abc',
    });

    await orders.create(newOrder);
  });

  afterAll(async () => {
    const connection = await client.connect();

    let sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    connection.query(sql);

    sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    connection.query(sql);

    connection.release();
  });

  describe('Testing Index Function', () => {
    it('Should Return List Of Orders', async () => {
      const res = await request
        .get('/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.body).toEqual([{ id: 1, ...newOrder }]);
    });
  });

  describe('Testing Show Function', () => {
    it('Should Return One Order', async () => {
      const res = await request
        .get('/orders/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });

      expect(res.body).toEqual({ id: 1, ...newOrder });
    });
  });

  describe('Testing Create Route', () => {
    it('Should Return The Created Order', async () => {
      const res = await request
        .post('/orders')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'active',
          user_id: 1,
        });

      expect(res.body.data).toEqual({
        id: 2,
        status: 'active',
        user_id: 1,
      });
    });
  });

  describe('Testing Destroy Route', () => {
    it('Should Return Deleted Order', async () => {
      const res = await request
        .delete('/orders/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });

      expect(res.body).toEqual({ id: 1, ...newOrder });
    });
  });

  describe('Testing Current Order Of a Certain User Route', () => {
    it('Should Return Currnet active Order', async () => {
      const res = await request
        .get('/orders/currentOrder/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });
      expect(res.body).toEqual({
        id: 2,
        status: 'active',
        user_id: 1,
      });
    });
  });

  before(async () => {
    await orders.create({
      status: 'complete',
      user_id: 1,
    });
  });

  xdescribe('Testing Completed Orders Of a Certain User Route', () => {
    it('Should Return list of Completed Orders', async () => {
      const res = await request
        .get('/orders/completedOrders/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });

      expect(res.body).toEqual([
        {
          id: 3,
          status: 'complete',
          user_id: 1,
        },
      ]);
    });
  });
});

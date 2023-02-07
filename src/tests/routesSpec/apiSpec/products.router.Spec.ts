import client from '../../../database';
import supertest from 'supertest';
import app from '../../../server';
import { Product } from '../../../types/product.type';
import { Products } from '../../../models/products.model';
import { Users } from '../../../models/users.model';
import { User } from '../../../types/user.type';

const request = supertest(app);
let token: string;
const newProduct: Product = {
  name: 'Pepsi Can',
  price: 5,
};
const newUser: User = {
  first_name: 'Abdelrrahman',
  last_name: 'Elhaddad',
  password: '123456',
};

describe('Testing Products Route', () => {
  beforeAll(async () => {
    const products = new Products();
    await products.create(newProduct);

    const users = new Users();
    token = await users.create(newUser);

    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterAll(async () => {
    const connection = await client.connect();

    let sql =
      'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(sql);

    sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);

    connection.release();
  });

  describe('Testing Index Function', () => {
    it('Should Return List Of Products', async () => {
      const res = await request
        .get('/products')
        .set('Content-type', 'application/json');

      expect(res.body).toEqual([{ id: 1, ...newProduct }]);
    });
  });

  describe('Testing Show Function', () => {
    it('Should Return One Product', async () => {
      const res = await request
        .get('/products/:id')
        .set('Content-type', 'application/json')
        .send({
          id: 1,
        });

      expect(res.body.name).toEqual(newProduct.name);
      expect(res.body.price).toEqual(newProduct.price);
    });
  });

  describe('Testing Create Route', () => {
    it('Should Return The Creayed Product', async () => {
      const res = await request
        .post('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Lays Chips',
          price: 7,
        });

      expect(res.body).toEqual({
        id: 2,
        name: 'Lays Chips',
        price: 7,
      });
    });
  });

  describe('Testing Destroy Route', () => {
    it('Should Return Deleted Product', async () => {
      const res = await request
        .delete('/products/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });

      expect(res.body).toEqual({ id: 1, ...newProduct });
    });
  });

  describe('Testing Update Price Route', () => {
    it('Should Return Updated Product', async () => {
      const res = await request
        .patch('/products/updatePrice/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 2,
          newPrice: 10,
        });

      expect(res.body).toEqual({ id: 2, name: 'Lays Chips', price: 10 });
    });
  });
});

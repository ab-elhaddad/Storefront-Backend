import app from '../../../server';
import supertest from 'supertest';
import client from '../../../database';
import { Users } from '../../../models/users.model';
import { User } from '../../../types/user.type';

const request = supertest(app);
let token: string;
const newUser: User = {
  first_name: 'Abdelrrahman',
  last_name: 'Elhaddad',
  password: '123456',
};

describe('Testing Users Router (Handler)', () => {
  beforeAll(async () => {
    const users = new Users();
    token = await users.create(newUser);
  });

  afterAll(async () => {
    const connection = await client.connect();

    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);

    connection.release();
  });

  describe('Testing Index Route', () => {
    it('Should Return List Of Users', async () => {
      const res = await request
        .get('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      expect(res.body).toEqual([
        {
          id: 1,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        },
      ]);
    });
  });

  describe('Testing Create Route', () => {
    it('Should Return Token', async () => {
      const res = await request
        .post('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          first_name: 'Ahmed',
          last_name: 'Sameh',
          password: 'abcd',
        });
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  xdescribe('Testing Show Route', () => {
    it('Should Return One User', async () => {
      const res = await request
        .get('/users/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });

      expect(res.body).toEqual({
        id: 1,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      });
    });
  });

  describe('Testing Destroy Route', () => {
    it('Should Return One User', async () => {
      const res = await request
        .delete('/users/:id')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
        });

      expect(res.body).toEqual({
        id: 1,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      });
    });
  });

  xdescribe('Testing Authenticate Route', () => {
    it('Should Return Token', async () => {
      const res = await request
        .get('/users/auth')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          first_name: 'Ahmed',
          last_name: 'Sameh',
          password: 'abcd',
        });
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});

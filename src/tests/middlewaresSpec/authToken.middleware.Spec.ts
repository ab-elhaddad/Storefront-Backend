import authToken from '../../middlewares/authToken.middleware';
import { User } from '../../types/user.type';
import { Users } from '../../models/users.model';
import client from '../../database/index';
import supertest from 'supertest';
import app from '../../server';

let token: string;
const request = supertest(app);

describe('Testing Authorize Token (authToken) Function', () => {
  beforeAll(async () => {
    const u: User = {
      first_name: 'Abdelrrahman',
      last_name: 'Elhaddad',
      password: '123456',
    };
    const users = new Users();
    token = await users.create(u);
  });
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });

  it('Defined', () => {
    expect(authToken).toBeDefined();
  });

  it('Should Return Invalid Token Response When Entering Wrong Token', async () => {
    const res = await request
      .get('/orders')
      .set('Contet-type', 'application/json')
      .set('Authorization', `Bearer ${token + 'abc'}`);

    expect(await res.body).toEqual('Invalid token');
  });

  it('Should Return Expected Response When Entering Valid Token', async () => {
    const res = await request
      .get('/orders')
      .set('Contet-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(await res.body).toEqual([]);
  });
});

import { Users } from '../../models/users.model';
import { User } from '../../types/user.type';
import client from './../../database/index';

describe('Testing Users Model', () => {
  const users = new Users();
  beforeAll(async () => {
    const newUser1: User = {
      first_name: 'test1',
      last_name: 'test1',
      password: '12345',
    };
    await users.create(newUser1);

    const newUser2: User = {
      first_name: 'test2',
      last_name: 'test2',
      password: '12345',
    };
    await users.create(newUser2);

    const newUser3: User = {
      first_name: 'test3',
      last_name: 'test3',
      password: '12345',
    };
    await users.create(newUser3);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1; ';
    await connection.query(sql);
  });

  describe('Testing Index Function', () => {
    it('Defined', () => {
      expect(users.index).toBeDefined();
    });

    it('Works', async () => {
      const res = await users.index();

      const user1 = {
        first_name: 'test1',
        last_name: 'test1',
      };

      const user2 = {
        first_name: 'test2',
        last_name: 'test2',
      };

      const user3 = {
        first_name: 'test3',
        last_name: 'test3',
      };

      const expected = [
        { id: 1, ...user1 },
        { id: 2, ...user2 },
        { id: 3, ...user3 },
      ];
      expect(res).toEqual(expected);
    });
  });

  describe('Testing Show Function', () => {
    it('Defined', () => {
      expect(users.show).toBeDefined();
    });

    it('Works', async () => {
      const res = await users.show(2);

      const shownUser = {
        id: 2,
        first_name: 'test2',
        last_name: 'test2',
      };

      expect(res).toEqual(shownUser);
    });
  });

  describe('Testing Create Function', () => {
    it('Defined', () => {
      expect(users.create).toBeDefined();
    });

    it('Works', async () => {
      const newUser: User = {
        first_name: 'test4',
        last_name: 'test4',
        password: 'abc123',
      };

      const res = await users.create(newUser);
      expect(res.length).toBeGreaterThan(0);
    });
  });

  describe('Testing Destroy Function', () => {
    it('Defined', () => {
      expect(users.destroy).toBeDefined();
    });

    it('Works', async () => {
      const res = await users.destroy(4);

      const deletedUser = {
        id: 4,
        first_name: 'test4',
        last_name: 'test4',
      };

      expect(res).toEqual(deletedUser);
    });
  });

  describe('Testing Authenticate Function', () => {
    it('Defined', () => {
      expect(users.authenticate).toBeDefined();
    });

    it('Return token when entering the right inpust', async () => {
      const u: User = {
        first_name: 'test1',
        last_name: 'test1',
        password: '12345',
      };
      const res = await users.authenticate(u);
      expect(res).not.toEqual('Wrong inputs');
      expect(res).not.toEqual('Wrong Password');
    });
  });
});

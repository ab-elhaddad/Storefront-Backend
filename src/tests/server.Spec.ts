import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Main Endpoint', () => {
  it('Works', async () => {
    const res = await request.get('/');
    expect(res.text).toBe('Hello World!');
  });
});

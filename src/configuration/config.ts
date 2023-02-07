import dotenv from 'dotenv';
dotenv.config();

export default {
  db: process.env.DATABASE,
  test_db: process.env.TEST_DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  env: process.env.ENV,
  salt: process.env.SALT,
  secretKey: process.env.SECRET_KEY,
  DBport: process.env.DB_PORT,
};

import config from '../configuration/config';
import { Pool } from 'pg';

const env = config.env as unknown as string;

const client = new Pool({
  database: env == 'dev' ? config.db : config.test_db,
  host: config.host,
  password: config.password,
  port: Number(config.DBport),
  user: config.user,
});

console.log(env);

export default client as Pool;

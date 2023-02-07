import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from './configuration/config';
import mainRouter from './routes/index.router';

const app: express.Application = express();
const port = config.port || 3000;
const address = `0.0.0.0:${port}`;

app.use(bodyParser.json());

mainRouter(app);

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!');
});

app.listen(3000, (): void => {
  console.log(`starting app on: ${address}`);
});

export default app;

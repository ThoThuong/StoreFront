import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';

import AppRouter from './routers/main.router';

dotenv.config();
let PORT = process.env.PORT || 3000;
if (process.env.ENV === "test") {
  PORT = 3001
}

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class StoreFrontApp {
  private AppRouterInstance: AppRouter = new AppRouter(app)
  constructor() {
    this.AppRouterInstance.init();
  }

  start() {
    app.listen(PORT, () => {
      console.info(`Server is starting at port: ${PORT}`);
    });
  }
}

const StoreFrontAppInstance = new StoreFrontApp();
StoreFrontAppInstance.start();

export default app;
import './Database';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import AuthMiddleware from '@/features/auth/AuthMiddleware';

import spendingRouter from '@/features/spendings/SpendingRouter';
import authRouter from '@/features/auth/AuthRouter';

const { PORT } = process.env;

class Server {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: true }));
    this.app.use('/app', AuthMiddleware.protect);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  routes() {
    spendingRouter(this.app);
    authRouter(this.app);
  }

  start() {
    this.app.listen(PORT, function () {
      console.log(`http://localhost:${PORT}`);
    });
  }
}

export default new Server();

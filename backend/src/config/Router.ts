import express from 'express';
import http from 'http';
import path from 'path';
import UsersRouter from '../components/users/router';

const pathToFront = '../../../frontend/build';

export default class Router {

  init(app: express.Application): void {
    const router: express.Router = express.Router();

    app.use('/users', UsersRouter);

    app.use(express.static(path.join(__dirname, pathToFront)));
    app.use('*', (req, res) => {
      res.sendFile('index.html', { root: path.join(__dirname, pathToFront) });
    })

    app.use((req, res, next) => {
      res.status(404).send(http.STATUS_CODES[404]);
    })

    app.use(router);
  }
}

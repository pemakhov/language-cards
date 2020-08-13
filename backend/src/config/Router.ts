import express from 'express';
import http from 'http';
import path from 'path';
import UsersRouter from '../components/users/router';

/**
 * Path to frontend build directory
 */
const pathToFront = '../../../frontend/build';

/**
 * Class managing routers
 */
export default class Router {

  /**
   * Makes application use router
   * @param {express.Application} app 
   */
  init(app: express.Application): void {
    const router: express.Router = express.Router();

    /**
     * User router
     */
    app.use('/api/users', UsersRouter);

    /**
     * Frontend static resources
     */
    app.use(express.static(path.join(__dirname, pathToFront)));
    app.use('*', (req, res) => {
      res.sendFile('index.html', { root: path.join(__dirname, pathToFront) });
    })

    /**
     * Page not found route
     */
    app.use((req, res, next) => {
      res.status(404).send(http.STATUS_CODES[404]);
    })

    app.use(router);
  }
}

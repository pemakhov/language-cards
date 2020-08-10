import express from 'express';
import http from 'http';
import EventManager from './EventManager';
import Middleware from '../config/Middleware';
import Router from '../config/Router';

/**
 * Creates and sets up a server
 */
export default class Server {
  /**
   * The instance of a server
   * @type {express.Application}
   */
  private server: express.Application;

  /**
   * The port number
   */
  private PORT: string = process.env.PORT || '3000';

  /**
   * Class constructor
   * @param expressApp express application
   */
  constructor(expressApp: express.Application, middleware: Middleware, router: Router) {
    this.server = expressApp;
    this.middlewareInit(middleware, this.server);
    this.routerInit(router, this.server);
  }

  /**
   * Binds middleware modules to the app
   * @param {Middleware} middleware 
   * @param {express.Application} app 
   */
  middlewareInit: Function = (middleware: Middleware, app: express.Application): void => {
    middleware.init(app);
  }

  /**
   * Binds router to the app
   * @param {Router} router 
   * @param {express.Application} app 
   */
  routerInit: Function = (router: Router, app: express.Application): void => {
    router.init(app);
  }

  /**
   * Creates and configures a new server
   */
  public start(): void {
    const eventManager: EventManager = new EventManager();
    eventManager.bind(http.createServer(this.server).listen(this.PORT), this.PORT);
  }
}

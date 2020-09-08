import express from 'express';
import Server from './server/Server';
import Middleware from './config/Middleware';
import Router from './config/Router';
import dotenv from 'dotenv';

dotenv.config();

const middleware: Middleware = new Middleware();
const router: Router = new Router();
const app: express.Application = express();
const server: Server = new Server(app, middleware, router);

server.start();

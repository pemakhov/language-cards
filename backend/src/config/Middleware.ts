import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

export default class Middleware {
  /**
   * Makes the application use middleware modules
   * @param {express.Application} app
   */
  public init: Function = (app: express.Application): void => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS "
        );
        res.header("Access-Control-Allow-Credentials", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With," +
            " Content-Type, Accept," +
            " Authorization," +
            " Access-Control-Allow-Credentials"
        );
        next();
      }
    );
  };
}

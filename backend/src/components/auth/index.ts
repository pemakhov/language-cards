import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../users/IUserDTO";
import Validator from "./Validator";
import UserService from "../users/service";
import AuthService from "./service";
import { IUserTokenStorageDTO } from "./IUserTokenStorageDTO";

import AuthorizationError from "../../error/AuthorizationError";
import ForbiddenError from "../../error/ForbiddenError";
import EnvironmentError from "../../error/EnvironmentError";
import ValidationError from "../../error/ValidationError";
import UserNotFoundError from "../../error/UserNotFoundError";

import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_EXPIRES_IN = "15m";

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || "";

interface ITokenPayload {
  _id: string;
  email: string;
}

const createAccessToken = (payload: ITokenPayload): string => {
  if (!ACCESS_TOKEN_SECRET) throw new EnvironmentError();

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

const createRefreshToken = (payload: ITokenPayload): string => {
  if (!REFRESH_TOKEN_SECRET) throw new EnvironmentError();
  return jwt.sign(payload, REFRESH_TOKEN_SECRET);
};

const removeObsoletedTokens = (
  storage: IUserTokenStorageDTO
): IUserTokenStorageDTO => {
  const currentDate = Date.now();
  const upToDateTokens = storage.tokens.filter(
    (token) =>
      (currentDate - token.createdAt.getTime()) / 1000 <
      parseInt(process.env.REFRESH_TOKEN_LIFE_SECONDS!)
  );

  const upToDateStorage: IUserTokenStorageDTO = {
    _id: storage._id,
    userId: storage.userId,
    tokens: upToDateTokens,
  };

  return upToDateStorage;
};

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = Validator.authenticateUser(req.body);

    if (error) throw new ValidationError(error.message);

    // validate user data
    const userDocument = await UserService.findByProperty({
      email: req.body.email,
    });

    const user: User = userDocument?.toObject();

    if (!user || !user._id) throw new UserNotFoundError();

    if (req.body.password !== user.password) throw new AuthorizationError();

    // create tokens
    const tokenPayload: ITokenPayload = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = createAccessToken(tokenPayload);
    const refreshToken = createRefreshToken(tokenPayload);

    // find storage
    const refreshTokenStorageDocument = await AuthService.findByUserId(
      user._id
    );

    const tokenDocument = {
      token: refreshToken,
      createdAt: new Date(),
    };

    if (refreshTokenStorageDocument) {
      // update existing storage
      const refreshTokenStorage: IUserTokenStorageDTO = refreshTokenStorageDocument.toObject();

      const upToDateTokenStorage = removeObsoletedTokens(refreshTokenStorage);

      upToDateTokenStorage.tokens.push(tokenDocument);

      await AuthService.updateById(
        upToDateTokenStorage._id!,
        upToDateTokenStorage
      );
    } else {
      // create new storage
      const refreshTokenStorage: IUserTokenStorageDTO = {
        userId: user._id,
        tokens: [],
      };

      refreshTokenStorage.tokens.push(tokenDocument);

      await AuthService.create(refreshTokenStorage);
    }

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw new AuthorizationError();

    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    if (!authToken) throw new AuthorizationError();

    jwt.verify(
      authToken,
      ACCESS_TOKEN_SECRET,
      async (error: any, user: any) => {
        if (error) return next(new ForbiddenError());

        req.user = user;
        return next();
      }
    );
  } catch (error) {
    next(error);
  }
};

const refreshAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new ForbiddenError();
    }

    const tokenPayload = <ITokenPayload>(
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    );

    const storageDocument = await AuthService.findByUserId(tokenPayload._id);

    if (!storageDocument) {
      throw new Error();
    }

    const storage: IUserTokenStorageDTO = storageDocument.toObject();

    const upToDateStorage = removeObsoletedTokens(storage);

    const tokenExistsInDb = upToDateStorage.tokens.find(
      (tokenDocument) => tokenDocument.token === refreshToken
    );

    if (!tokenExistsInDb) {
      throw new AuthorizationError();
    }

    const newPayload = {
      _id: tokenPayload._id,
      email: tokenPayload.email,
    };

    const newAccessToken = createAccessToken(newPayload);
    const newRefreshToken = createRefreshToken(newPayload);

    const refreshTokenDocument = {
      token: newRefreshToken,
      createdAt: new Date(),
    };

    upToDateStorage.tokens.push(refreshTokenDocument);

    await AuthService.updateById(upToDateStorage._id!, upToDateStorage);

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    // unauthorized
    if (error instanceof AuthorizationError) {
      return res.status(401).json({
        error: "401",
        message: "Unauthorized",
      });
    }

    // access forbidden
    if (error instanceof ForbiddenError) {
      return res.status(403).json({
        error: "403",
        message: "Access forbidden",
      });
    }

    res.status(500).json({ error: "500", message: error.message });
  }
};

export default {
  authenticateUser,
  authenticateToken,
  refreshAccess,
};

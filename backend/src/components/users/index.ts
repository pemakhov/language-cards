import express from "express";
import UserService from "./service";
import UserValidator from "./Validator";
import ValidationError from "../../error/ValidationError";
import UserNotFoundError from '../../error/UserNotFoundError';

/**
 * Finds and return the array of all users
 * @param req 
 * @param res 
 * @param next 
 */
const findAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await UserService.findAll();

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "500",
      message: error.message,
    });

    return next(error);
  }
};

 /**
  * Find a user by ID
  * @param req 
  * @param res 
  * @param next 
  */
const findById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    /**
     * Result of ID validation . Undefined if valid.
     */
    const { error } = UserValidator.findById(req.params.id);

    if (error) {
      throw new ValidationError(error.message);
    }

    /**
     * User data
     */
    const user = await UserService.findById(req.params.id);

    if (user === null) {
      throw new UserNotFoundError();
    }

    res.status(200).send(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: "422",
        message: error.message,
      });
    }

    if (error instanceof UserNotFoundError) {
      return res.status(404).json({
        error: "404",
        message: error.message,
      });
    }

    res.status(500).json({ error: "500", message: error.message });

    return next(error);
  }
};

 /**
  * Create a user in database
  * @param req 
  * @param res 
  * @param next 
  */
const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    /**
     * Result of data validation . Undefined if valid.
     */
    const { error } = UserValidator.create(req.body);

    if (error) {
      throw new ValidationError(error.message);
    }

    /**
     * User data
     */
    const user = await UserService.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        error: "422",
        message: error.message,
      });
    }

    if (error.code && error.code === 11000) {
      return res.status(409).json({
        error: "409",
        message: "Email is used",
      });
    }

    res.status(500).json({ error: "500", message: error.message });

    return next(error);
  }
};

export default {
  findAll,
  findById,
  create,
};

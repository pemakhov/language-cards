import express from "express";
import UserService from "./service";
import UserValidator from "./Validator";
import bcrypt from 'bcrypt';
import ValidationError from "../../error/ValidationError";
import UserNotFoundError from "../../error/UserNotFoundError";
import { matchAndSendErrorResponse } from "./errorHandler";

/**
 * Find all users
 * @param req
 * @param res
 * @param next
 * @returns the array of all users
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
 * @returns the user object
 */
const findById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { error } = UserValidator.findById(req.params._id);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await UserService.findById(req.params._id);

    if (user === null) {
      throw new UserNotFoundError();
    }

    res.status(200).send(user);
  } catch (error) {
    matchAndSendErrorResponse(error, res);
    return next(error);
  }
};

const findByEmail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { error } = UserValidator.findByEmail(req.params.email);

    if (error) throw new ValidationError(error.message);

    const user = await UserService.findByProperty({ email: req.params.email });

    if (user === null) {
      throw new UserNotFoundError();
    }

    res.status(200).send(user);
  } catch (error) {
    matchAndSendErrorResponse(error, res);
    return next(error);
  }
};

/**
 * Create a new user
 * @param req
 * @param res
 * @param next
 * @returns the created user object
 */
const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { error } = UserValidator.create(req.body);

    if (error) {
      throw new ValidationError(error.message);
    }

    const saltRounds = 10;
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const data = {
      email,
      password: passwordHash,
    }

    const user = await UserService.create(data);
    res.status(200).send(user._id);
  } catch (error) {
    matchAndSendErrorResponse(error, res);
    return next(error);
  }
};

/**
 * Update a user by ID
 * @param req
 * @param res
 * @param next
 */
const updateById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { error } = UserValidator.updateById(req.body);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await UserService.updateById(req.body._id, req.body);

    if (user === null) {
      throw new UserNotFoundError();
    }

    res.status(200).send(user);
  } catch (error) {
    matchAndSendErrorResponse(error, res);
    return next(error);
  }
};

/**
 * Delete a user by ID
 * @param req
 * @param res
 * @param next
 */
const deleteById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { error } = UserValidator.deleteById(req.body._id);

    if (error) {
      throw new ValidationError(error.message);
    }

    const user = await UserService.deleteById(req.body);

    if (user.n === 0 && user.deletedCount === 0) {
      throw new UserNotFoundError();
    }

    res.status(200).send(user);
  } catch (error) {
    matchAndSendErrorResponse(error, res);
    return next(error);
  }
};

export default {
  findAll,
  findById,
  findByEmail,
  create,
  updateById,
  deleteById,
};

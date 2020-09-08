import { Response } from "express";
import ValidationError from "../../error/ValidationError";
import UserNotFoundError from "../../error/UserNotFoundError";
import AuthorizationError from "../../error/AuthorizationError";
import ForbiddenError from "../../error/ForbiddenError";

/**
 * Match and send a proper error response
 * @param error
 * @param res
 */
export const matchAndSendErrorResponse = (
  error: Error | any,
  res: Response
) => {
  // wrong data provided
  if (error instanceof ValidationError) {
    return res.status(422).json({
      error: "422",
      message: error.message,
    });
  }

  // user not found 
  if (error instanceof UserNotFoundError) {
    return res.status(404).json({
      error: "404",
      message: error.message,
    });
  }

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
};

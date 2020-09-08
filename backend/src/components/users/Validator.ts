import Joi from '@hapi/joi';
import { Types } from 'mongoose';
import { User } from './IUserDTO';

/**
 * Validator functions
 */
export default {

  findById(_id: string) {
    return Joi.object({
      id: Types.ObjectId,
    }).validate({ _id });
  },

  findByEmail(email: string) {
    return Joi.object({
      email: Joi.string().email(),
    }).validate({ email });
  },

  create(user: User) {
    return Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(32),
    }).validate(user);
  },

  updateById(user: User) {
    return Joi.object({
      _id: Types.ObjectId,
      email: Joi.string().email(),
      password: Joi.string().min(6).max(32),
    }).validate(user);
  },

  deleteById(_id: string) {
    return Joi.object({
      _id: Types.ObjectId,
    }).validate({ _id });
  },

}
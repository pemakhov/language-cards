import Joi from '@hapi/joi';
import { Types } from 'mongoose';
import { User } from './IUserDTO';

export default {

  findById(id: string) {
    return Joi.object({
      id: Types.ObjectId,
    }).validate({ id });
  },

  create(profile: User) {
    return Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(32),
    }).validate(profile);
  }

}
import Joi from '@hapi/joi';
import { User } from '../users/IUserDTO';

/**
 * Validator functions
 */
export default {

  authenticateUser(user: User) {
    return Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6).max(32),
    }).validate(user);
  },

}
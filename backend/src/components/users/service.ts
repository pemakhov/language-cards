import UserModel from './model';
import { User } from './UserDTO';

/**
 * Gets the list of all users
 * @returns {Promise<UserModel[]>}
 */
const findAll = () => {
  return UserModel.find({}).exec();
}

/**
 * Gets one user
 * @param {string} id 
 * @returns {Promise<UserModel>}
 */
const findById = (id: string) => {
  return UserModel.findById(id).exec();
}

/**
 * Creates a new user
 * @param {User} profile 
 * @returns {Promise<UserModel>}
 */
const create = (profile: User) => {
  return UserModel.create(profile);
}

/**
 * Updates one user's profile
 * @param {string} id 
 * @param {User} newProfile 
 * @returns {Promise<void>}
 */
const updateById = (id: string, newProfile: User) => {
  return UserModel.updateOne({id}, newProfile).exec();
}

/**
 * Deletes a user
 * @param {string} id 
 * @returns {Promise<void>}
 */
const deleteById = (id: string) => {
  return UserModel.deleteOne({id}).exec();
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
}

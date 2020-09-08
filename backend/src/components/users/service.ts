import UserModel from "./model";
import { User } from "./IUserDTO";

/**
 * Gets the list of all users
 * @returns {Promise<UserModel[]>}
 */
const findAll = () => {
  return UserModel.find({}).exec();
};

/**
 * Gets one user
 * @param {string} _id
 * @returns {Promise<UserModel>}
 */
const findById = (_id: string) => {
  return UserModel.findById(_id).exec();
};

/**
 * Gets a user parameter
 * @param property
 * @returns {Promise<UserModel>}
 */
const findByProperty = (property: {}) => {
  return UserModel.findOne(property).exec();
};

/**
 * Creates a new user
 * @param {User} profile
 * @returns {Promise<UserModel>}
 */
const create = (profile: User) => {
  return UserModel.create(profile);
};

/**
 * Updates one user's profile
 * @param {string} id
 * @param {User} newProfile
 * @returns {Promise<void>}
 */
const updateById = (_id: string, newProfile: User) => {
  return UserModel.updateOne({ _id }, newProfile).exec();
};

/**
 * Deletes a user
 * @param {string} _id
 * @returns {Promise<void>}
 */
const deleteById = (_id: string) => {
  return UserModel.deleteOne({ _id }).exec();
};

export default {
  findAll,
  findById,
  findByProperty,
  create,
  updateById,
  deleteById,
};

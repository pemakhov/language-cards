import UserTokensModel from "./UserTokensModel";
import { IUserTokenStorageDTO } from "./IUserTokenStorageDTO";

/**
 * Finds all user tokens of all ever logged in users.
 * Tokens are grouped in storages by userId.
 */
const findAll = () => {
  return UserTokensModel.find({}).exec();
};

/**
 * Finds a storage of tokens by storage ID
 * @param _id ID of refresh token storage (not userId)
 */
const findById = (_id: string) => {
  return UserTokensModel.findById(_id).exec();
};

/**
 * Finds a storage by user ID
 * @param userId
 */
const findByUserId = (userId: string) => {
  return UserTokensModel.findOne({ userId }).exec();
};

/**
 * Creates a new storage of tokens
 * @param storage 
 */
const create = (storage: IUserTokenStorageDTO) => {
  return UserTokensModel.create(storage);
};

/**
 * Updates user's storage of tokens
 * @param _id 
 * @param updatedStorage 
 */
const updateById = (_id: string, updatedStorage: IUserTokenStorageDTO) => {
  return UserTokensModel.updateOne({ _id }, updatedStorage, (error, result) => console.log(error, result)).exec();
};

/**
 * Deletes user's storage of tokens
 * @param storage 
 */
const deleteById = (storage: IUserTokenStorageDTO) => {
  return UserTokensModel.deleteOne({ storage }).exec();
};

const pushToken = async (storageId: string, token: string) => {
  const storageDocument = await UserTokensModel.findById(storageId)
  if (!storageDocument) throw new Error();
  const storage = storageDocument.toObject();
  storage.tokens.push(token);
  await UserTokensModel.updateOne({_id: storageId}, storage)
}

export default {
  findAll,
  findById,
  findByUserId,
  create,
  updateById,
  deleteById,
};

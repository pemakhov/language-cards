/**
 * Class representing validation error
 * @extends Error
 */
export default class UserNotFoundError extends Error {
  /**
   * The class constructor
   * @param {string} message 
   */
  constructor() {
    super();
    this.message = 'User not found';
    this.name = 'E_USER_NOT_FOUND';
  }
}
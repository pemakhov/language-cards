/**
 * Class representing user not found error
 * @extends Error
 */
export default class UserNotFoundError extends Error {
  /**
   * The class constructor
   */
  constructor() {
    super();
    this.message = 'User not found';
    this.name = 'E_USER_NOT_FOUND';
  }
}
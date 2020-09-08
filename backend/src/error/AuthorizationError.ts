/**
 * Class representing authorization error
 * @extends Error
 */
export default class AuthorizationError extends Error {
  /**
   * The class constructor
   */
  constructor() {
    super();
    this.message = 'Unauthorized';
    this.name = 'E_AUTHORIZATION';
  }
}
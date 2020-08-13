/**
 * Class representing validation error
 * @extends Error
 */
export default class ValidationError extends Error {
  /**
   * The class constructor
   * @param {string} message 
   */
  constructor(message: string) {
    super();
    this.message = message;
    this.name = 'E_MISSING_OR_INVALID_PARAMS';
  }
}
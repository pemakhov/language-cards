/**
 * Class representing validation error
 * @extends Error
 */
export default class ForbiddenError extends Error {
  /**
   * The class constructor
   */
  constructor() {
    super();
    this.message = 'Access forbidden';
    this.name = 'E_FORBIDDEN';
  }
}
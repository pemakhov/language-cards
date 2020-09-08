/**
 * Class representing environment error
 * @extends Error
 */
export default class EnvironmentError extends Error {
  /**
   * The class constructor
   */
  constructor() {
    super();
    this.message = 'Missing environment variable';
    this.name = 'E_MISSING_ENVIRONMENT_VAR'
  }
}
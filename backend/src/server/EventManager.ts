import http from "http";

/**
 * Class binding the appropriate callbacks to the events
 */
export default class EventManager {
  /**
   * Manages the error events
   * @param {NodeJS.ErrnoException} error
   * @param {string} port
   */
  private onError: Function = (error: NodeJS.ErrnoException, port: string) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    switch (error.code) {
      case "EACCES":
        console.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`Port ${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  /**
   * Manages listening event
   * @param {string} port
   */
  private onListening: Function = (port: string): void => {
    console.log(`Listening on the port ${port}`);
  };

  /**
   * Binds behavior to the events
   * @param {http.Server} server
   * @param {string} port
   */
  public bind(server: http.Server, port: string): void {
    server.on("error", (error: Error) => this.onError(error, port));
    server.on("listening", () => this.onListening(port));
  }
}

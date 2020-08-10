import mongoose from "mongoose";

const MONGODB_URI: string = "mongodb://localhost:27017/";
const MONGO_DB_MAIN: string = "lang-cards";
const MONGO_URI: string = `${MONGODB_URI}${MONGO_DB_MAIN}`;

const connectOptions: mongoose.ConnectionOptions = {
  // automatically try to reconnect when it loses connection
  autoReconnect: true,
  // reconnect every reconnectInterval milliseconds
  // for reconnectTries times
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  // flag to allow users to fall back to the old
  // parser if they find a bug in the new parse
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export default mongoose.createConnection(MONGO_URI, connectOptions);

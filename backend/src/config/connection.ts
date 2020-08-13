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
  // custom flags
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

export default mongoose.createConnection(MONGO_URI, connectOptions);

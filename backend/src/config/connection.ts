import mongoose from "mongoose";

const MONGODB_URI: string = "mongodb://localhost:27017/";
const MONGO_DB_MAIN: string = "lang-cards";
const MONGO_URI: string = `${MONGODB_URI}${MONGO_DB_MAIN}`;

const connectOptions: mongoose.ConnectionOptions = {
  // custom flags
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

export default mongoose.createConnection(MONGO_URI, connectOptions);

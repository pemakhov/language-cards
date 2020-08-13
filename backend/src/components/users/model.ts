import { Schema } from "mongoose";
import connection from "../../config/connection";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

export default connection.model("UserModel", UserSchema);

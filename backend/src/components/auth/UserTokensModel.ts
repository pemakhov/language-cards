import { Schema } from "mongoose";
import connection from "../../config/connection";

const UserTokensSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
        createdAt: Date,
      },
    ],
  },
  {
    collection: "refresh-tokens",
    versionKey: false,
  }
);

export default connection.model("UserTokensModel", UserTokensSchema);

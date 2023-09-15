import { Schema, model } from "mongoose";
import { schemaOptions } from "../config.js";

const torrentSchema = new Schema(
  {
    username: String,
    user_id: Number,
    torrent_id: String,
    torrent_name: String,
    hash: String,
    infohash_v1: String,
    Size: String,
  },
  schemaOptions
);

export const Data = new model("Data", torrentSchema);

import { config } from "dotenv";
config();

import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI);

import { Data } from "./models/torrentModel.js";

export { Data }
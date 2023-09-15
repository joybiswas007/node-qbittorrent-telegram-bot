import dotenv from "dotenv";
dotenv.config();
import { QBittorrent } from "@ctrl/qbittorrent";

export const client = new QBittorrent({
  baseUrl: process.env.QBIT_WEBUI_URL,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});


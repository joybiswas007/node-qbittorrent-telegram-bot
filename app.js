import dotenv from "dotenv";
dotenv.config();

import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//Import command
import { status } from "./commands/torrentStatus.js";
import { mirror } from "./commands/mirrorTorrent.js";
import { remove } from "./commands/removeTorrent.js";

//Use command
status(bot);
mirror(bot);
remove(bot);
import { config } from "dotenv";
config();

import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//Import command
import { addTorrent } from "./commands/addTorrent.js";
import { removeTorrent } from "./commands/removeTorrent.js";
import { status } from "./commands/torrentStatus.js";
import { appStats } from "./commands/appStats.js";

//Use command
addTorrent(bot);
removeTorrent(bot);
status(bot);
appStats(bot);

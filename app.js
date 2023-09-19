import { config } from "dotenv";
config();

import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

//Import command
import { addTorrent } from "./bot/commands/addTorrent.js";
import { removeTorrent } from "./bot/commands/removeTorrent.js";
import { pauseTorrent } from "./bot/commands/pauseTorrent.js";
import { resumeTorrent } from "./bot/commands/resumeTorrent.js";
import { status } from "./bot/commands/torrentStatus.js";
import { serverStats } from "./bot/commands/serverStats.js";

//Use command
addTorrent(bot);
removeTorrent(bot);
pauseTorrent(bot);
resumeTorrent(bot);
status(bot);
serverStats(bot);

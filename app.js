import { config } from "dotenv";

import TelegramBot from "node-telegram-bot-api";

// Import command
import addTorrentFile from "./bot/commands/addTorrentFile.js";
import addMagnet from "./bot/commands/addMagnet.js";
import removeTorrent from "./bot/commands/removeTorrent.js";
import pauseTorrent from "./bot/commands/pauseTorrent.js";
import resumeTorrent from "./bot/commands/resumeTorrent.js";
import torrentStatus from "./bot/commands/torrentStatus.js";
import serverStats from "./bot/commands/serverStats.js";

config();

const { BOT_TOKEN, SUDO_USER } = process.env;
const sudoUser = parseInt(SUDO_USER, 10);

const token = BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Use command
addTorrentFile(bot, sudoUser);
addMagnet(bot, sudoUser);
removeTorrent(bot, sudoUser);
pauseTorrent(bot, sudoUser);
resumeTorrent(bot, sudoUser);
torrentStatus(bot, sudoUser);
serverStats(bot, sudoUser);

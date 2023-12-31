import { config } from "dotenv";
config();

import { QBittorrent } from "@ctrl/qbittorrent";

//Qbittorrent global config

export const client = new QBittorrent({
  baseUrl: process.env.QBIT_WEBUI_URL,
  username: process.env.QBIT_USERNAME,
  password: process.env.QBIT_PASSWORD,
});

//Display data in MiB or GiB depends on the size

export const size = (x) => {
  const units = [
    "bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];
  let l = 0,
    n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

//Display OS uptime

export const osuptime = (x) => {
  const hours = Math.floor(x / 3600);
  const minutes = Math.floor((x % 3600) / 60);
  const seconds = Math.floor(x % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
};

//Only specified user can run the bot
export const sudoChecker = (
  user_id,
  username,
  sudo_user,
  bot,
  chatID,
  options
) => {
  if (user_id !== sudo_user) {
    bot.sendMessage(
      chatID,
      `@${username} you aren't authorized!`,
      options || {}
    );
    return false;
  }

  return true;
};

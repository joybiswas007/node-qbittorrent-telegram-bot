import { client, torrent_size } from "./config.js";

export const status = (bot) => {
  bot.onText(/\/status/, async (msg) => {
    const chatID = msg.chat.id;
    try {
      const data = await client.getAllData();
      const torrents = data.torrents;
      let message = "";
      torrents.map((torrent) => {
        message += `<b>Name: ${torrent.name}</b>\n`;
        message += `Completed: ${torrent.isCompleted}\n`;
        message += `Size: ${torrent_size(torrent.raw.total_size)}\n`;
        message += `<em>/cancel ${torrent.id}</em>\n\n`;
      });
      bot.sendMessage(chatID, message, { parse_mode: "HTML" });
    } catch (error) {
      bot.sendMessage(chatID, `Error: ${error}`);
    }
  });
};

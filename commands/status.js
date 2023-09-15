import { client } from "./config.js";

export const status = (bot) => {
  bot.onText(/\/status/, async (msg) => {
    const chatID = msg.chat.id;
    try {
      const data = await client.getAllData();
      const torrents = data.torrents;
      torrents.map((torrent) => {
        bot.sendMessage(
          chatID,
          `<b>Name: ${torrent.name}</b>\nCompleted: ${torrent.isCompleted}\n<em>/cancel ${torrent.id}</em>`,
          { parse_mode: "HTML" }
        );
      });
    } catch (error) {
      bot.sendMessage(chatID, `Error: ${error}`);
    }
  });
};

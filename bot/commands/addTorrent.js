import { client } from "../config.js";
import { Data } from "../db/dbSchema.js";

export const addTorrent = (bot) => {
  bot.onText(/\/add|\/a/, async (msg, match) => {
    const chatID = msg.chat.id;
    const magnet = msg.text.replace(match[0], "").trim();
    const { id: user_id, username } = msg.from;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    try {
      const addMagnet = await client.addMagnet(magnet, {});
      if (addMagnet === true) {
        bot.sendMessage(
          chatID,
          `@${username} your torrent has been added to queue!`,
          options
        );
      }
      const data = await client.getAllData();
      data.torrents.forEach((torrent) => {
        const { id: torrent_id, name: torrent_name } = torrent;
        const { hash, infohash_v1, total_size: Size } = torrent.raw;
        const userData = new Data({
          username,
          user_id,
          torrent_id,
          torrent_name,
          hash,
          infohash_v1,
          Size,
        });
        userData.save();
      });
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

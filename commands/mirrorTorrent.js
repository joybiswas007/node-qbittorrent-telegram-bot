import { client } from "./config.js";
import { Data } from "../db/dbSchema.js";

export const mirror = (bot) => {
  bot.onText(/\/mirror|\/m/, (msg, match) => {
    const chatID = msg.chat.id;
    const magnet = msg.text.replace(match[0], "").trim();
    const { id: user_id, username } = msg.from;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    try {
      const addMag = client.addMagnet(magnet, {});
      addMag
        .then(async (torrent) => {
          if (torrent === true) {
            bot.sendMessage(
              chatID,
              `@${username} your torrent has been added to queue!`,
              options
            );
          }
          const data = await client.getAllData();
          const torrents = data.torrents;
          torrents.forEach((tor) => {
            const { id: torrent_id, name: torrent_name } = tor;
            const { hash, infohash_v1, total_size: Size } = tor.raw;
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
        })
        .catch((err) => {
          bot.sendMessage(chatID, `${err}`, options);
        });
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

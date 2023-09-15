import { client } from "./config.js";
import { Data } from "../db/dbSchema.js";

export const remove = (bot) => {
  bot.onText(/\/remove|\/rm|\/cancel/, (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const user_hash = msg.text.replace(match[0], "").trim();
    const options = { reply_to_message_id: msgID };
    const { id: userid, username } = msg.from;
    try {
      Data.findOneAndDelete({ user_id: userid, hash: user_hash })
        .then((info) => {
          if (info.user_id === userid && info.hash === user_hash) {
            const rmTor = client.removeTorrent(user_hash, true);
            rmTor.then((torrent_hash) => {
              if (torrent_hash === true) {
                bot.sendMessage(
                  chatID,
                  `@${username} torrent has been removed from the queue!`,
                  options
                );
              }
            });
          }
        })
        .catch((err) => {
          bot.sendMessage(
            chatID,
            `@${username} you can't stop other peoples download(s)`,
            options
          );
        });
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

import { client } from "./config.js";
import { Data } from "../db/dbSchema.js";

export const removeTorrent = (bot) => {
  bot.onText(/\/remove|\/rm|\/cancel/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const user_hash = msg.text.replace(match[0], "").trim();
    const options = { reply_to_message_id: msgID };
    const { id: userid, username } = msg.from;
    let rmTor;

    if (match[0] === "/remove" || match[0] === "/rm") {
      rmTor = await client.removeTorrent(user_hash, false); //only remove torrent from client
    } else if (match[0] === "/cancel") {
      rmTor = await client.removeTorrent(user_hash, true); //remove torrent with data;
    }

    try {
      const info = await Data.findOneAndDelete({
        user_id: userid,
        hash: user_hash,
      });

      if (info.user_id === userid && info.hash === user_hash) {
        if (rmTor === true) {
          bot.sendMessage(
            chatID,
            `@${username} torrent has been removed from the queue`,
            options
          );
        } else {
          bot.sendMessage(
            chatID,
            `@${username} failed to remove torrent from queue`,
            options
          );
        }
      } else {
        bot.sendMessage(
          chatID,
          `@${username} you can't stop other peoples download(s)`,
          options
        );
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

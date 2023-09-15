import { client } from "./config.js";

export const remove = (bot) => {
  bot.onText(/\/remove|\/rm|\/cancel/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const hashes = msg.text.replace(match[0], "").trim();
    const options = { reply_to_message_id: msgID };
    const { username } = msg.from;
    try {
      const rmTor = client.removeTorrent(hashes, true);
      rmTor
        .then((hash) => {
          if (hash === true) {
            bot.sendMessage(
              chatID,
              `@${username} torrent has been successfully removed from the queue!`,
              options
            );
          } else {
            bot.sendMessage(
              chatID,
              `@${username} failed to remove torrent from the queue!`,
              options
            );
          }
        })
        .catch((err) => {
          bot.sendMessage(chatID, `Erro: ${err}`, options);
        });
    } catch (error) {
      bot.sendMessage(chatID, `Error: ${error}`, options);
    }
  });
};

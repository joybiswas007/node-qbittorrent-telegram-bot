import { client } from "../config.js";

export const resumeTorrent = (bot) => {
  bot.onText(/\/resume|\/rs/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    const torrent_hash = msg.text.replace(match[0], "").trim();
    try {
      const resume_torrent = await client.resumeTorrent(torrent_hash);
      if (!torrent_hash) {
        bot.sendMessage(
          chatID,
          "Must provide torrent id to resume torrent.",
          options
        );
      } else {
        if (resume_torrent === true) {
          bot.sendMessage(
            chatID,
            `@${msg.from.username} torrent has been resumed`,
            options
          );
        } else {
          bot.sendMessage(
            chatID,
            `@${msg.from.username} failed to resume torrent`,
            options
          );
        }
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

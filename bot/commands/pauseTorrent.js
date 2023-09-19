import { client, sudoChecker } from "../config.js";

export const pauseTorrent = (bot) => {
  bot.onText(/\/pause|\/p/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const { id: user_id, username } = msg.from;
    const options = { reply_to_message_id: msgID };
    const torrent_hash = msg.text.replace(match[0], "").trim();
    const sudo_user = parseInt(process.env.SUDO_USER);
    if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
      return;
    }
    try {
      const pause_torrent = await client.pauseTorrent(torrent_hash);
      if (!torrent_hash) {
        bot.sendMessage(
          chatID,
          "Must provide torrent id to pause torrent.",
          options
        );
      } else {
        if (pause_torrent === true) {
          bot.sendMessage(
            chatID,
            `@${msg.from.username} torrent has been paused`,
            options
          );
        } else {
          bot.sendMessage(
            chatID,
            `@${msg.from.username} failed to pause torrent`,
            options
          );
        }
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

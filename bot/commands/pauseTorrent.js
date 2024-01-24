import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";

const pauseTorrent = (bot, sudoUser) => {
  bot.onText(/\/pause/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const { id: userId, username } = msg.from;
    const options = { reply_to_message_id: msgID };
    const torrentHash = msg.text.replace(match[0], "").trim();
    if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
      return;
    }
    try {
      if (!torrentHash) {
        return bot.sendMessage(
          chatID,
          "Must provide torrent id to pause torrent.",
          options
        );
      }

      const pauseTorrentWithHash = await client.pauseTorrent(torrentHash);

      if (pauseTorrentWithHash) {
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
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

export default pauseTorrent;

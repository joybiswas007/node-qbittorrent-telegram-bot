import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";

const resumeTorrent = (bot, sudoUser) => {
  bot.onText(/\/resume|\/rs/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    const torrentHash = msg.text.replace(match[0], "").trim();
    const { id: userId, username } = msg.from;
    if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
      return;
    }
    try {
      const resumeTorrentWithHash = await client.resumeTorrent(torrentHash);
      if (!torrentHash) {
        return bot.sendMessage(
          chatID,
          "Must provide torrent id to resume torrent.",
          options
        );
      }

      if (resumeTorrentWithHash) {
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
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

export default resumeTorrent;

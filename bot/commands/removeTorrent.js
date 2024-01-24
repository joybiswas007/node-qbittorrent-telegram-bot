import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";

const removeTorrent = (bot, sudoUser) => {
  bot.onText(/\/remove|\/cancel/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const userHash = msg.text.replace(match[0], "").trim();
    const options = { reply_to_message_id: msgID };
    const { id: userId, username } = msg.from;
    let rmTor;
    if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
      return;
    }
    try {
      if (!userHash) {
        return bot.sendMessage(
          chatID,
          "Must provide torrent id to remove torrent.",
          options
        );
      }
      if (match[0] === "/remove") {
        rmTor = await client.removeTorrent(userHash, false); // only remove torrent from client
      } else if (match[0] === "/cancel") {
        rmTor = await client.removeTorrent(userHash, true); // remove torrent with data;
      }
      if (rmTor) {
        bot.sendMessage(
          chatID,
          `@${username} torrent has been removed from the queue.`,
          options
        );
      } else {
        bot.sendMessage(
          chatID,
          `@${username} failed to remove torrent from queue.`,
          options
        );
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

export default removeTorrent;

import { client, sudoChecker } from "../config.js";

export const removeTorrent = (bot) => {
  bot.onText(/\/remove|\/cancel/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const user_hash = msg.text.replace(match[0], "").trim();
    const options = { reply_to_message_id: msgID };
    const { id: user_id, username } = msg.from;
    const sudo_user = parseInt(process.env.SUDO_USER);
    let rmTor;
    if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
      return;
    }
    try {
      if (match[0] === "/remove") {
        rmTor = await client.removeTorrent(user_hash, false); //only remove torrent from client
      } else if (match[0] === "/cancel") {
        rmTor = await client.removeTorrent(user_hash, true); //remove torrent with data;
      }
      if (rmTor) {
        bot.sendMessage(
          chatID,
          `@${username} torrent has been removed from the client`,
          options
        );
      } else {
        bot.sendMessage(
          chatID,
          `@${username} failed to remove torrent from queue`,
          options
        );
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

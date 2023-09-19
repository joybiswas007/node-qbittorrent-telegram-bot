import { client, sudoChecker } from "../config.js";

export const resumeTorrent = (bot) => {
  bot.onText(/\/resume|\/rs/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    const torrent_hash = msg.text.replace(match[0], "").trim();
    const { id: user_id, username } = msg.from;
    const sudo_user = parseInt(process.env.SUDO_USER);
    if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
      return;
    }
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

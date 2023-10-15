import { client, sudoChecker } from "../config.js";

export const addMagnet = (bot) => {
  bot.onText(/\/magnet|\/m/, async (msg, match) => {
    const chatID = msg.chat.id;
    const magnet = msg.text.replace(match[0], "").trim();
    const { id: user_id, username } = msg.from;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    const sudo_user = parseInt(process.env.SUDO_USER);
    try {
      if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
        return;
      }
      if (magnet.length === 0) {
        return bot.sendMessage(
          chatID,
          "Kindly provide a magnet link.",
          options
        );
      }
      const addMagnet = await client.addMagnet(magnet, {});
      if (addMagnet) {
        bot.sendMessage(
          chatID,
          `@${username} your torrent has been added to queue!`,
          options
        );
      }
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

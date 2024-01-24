import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";

const addMagnet = (bot, sudoUser) => {
  bot.onText(/\/magnet|\/m/, async (msg, match) => {
    const chatID = msg.chat.id;
    const magnet = msg.text.replace(match[0], "").trim();
    const { id: userId, username } = msg.from;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    try {
      if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
        return;
      }
      if (magnet.length === 0) {
        return bot.sendMessage(
          chatID,
          "Kindly provide a magnet link.",
          options
        );
      }
      const addMagnetLink = await client.addMagnet(magnet, {});
      if (addMagnetLink) {
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

export default addMagnet;

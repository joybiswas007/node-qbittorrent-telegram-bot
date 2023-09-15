import { client } from "./config.js";

export const mirror = (bot) => {
  bot.onText(/\/mirror|\/m/, (msg, match) => {
    const chatID = msg.chat.id;
    const magnet = msg.text.replace(match[0], "").trim();
    const { username } = msg.from;
    const msgID = msg.message_id;
    try {
      const addMag = client.addMagnet(magnet, {});
      addMag
        .then((torrent) => {
          if (torrent === true) {
            bot.sendMessage(
              chatID,
              `@${username} your torrent has been added to queue!`,
              { reply_to_message_id: msgID }
            );
          } else {
            bot.sendMessage(
              chatID,
              `@${username} failed to add torrent to queue!`,
              { reply_to_message_id: msgID }
            );
          }
        })
        .catch((err) => {
          bot.sendMessage(chatID, `Error: ${err}`, {
            reply_to_message_id: msgID,
          });
        });
    } catch (error) {
      bot.sendMessage(chatID, `Error: ${error}`);
    }
  });
};

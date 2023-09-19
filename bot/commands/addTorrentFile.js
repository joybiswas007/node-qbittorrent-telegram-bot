import { client, sudoChecker } from "../config.js";
import fs from "fs";

export const addTorrentFile = (bot) => {
  bot.on("document", async (torrent) => {
    const { id: chatID, title: chat_name } = torrent.chat;
    const { id: user_id, username } = torrent.from;
    const msgId = torrent.message_id;
    const options = { reply_to_message_id: msgId };
    const torrentsDir = "./torrents";
    const { file_id: fileId, mime_type } = torrent.document;
    const sudo_user = parseInt(process.env.SUDO_USER);
    if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
      return;
    }
    try {
      //check for filetypes if not .torrent files then sends user a message
      if (mime_type !== "application/x-bittorrent") {
        bot.sendMessage(
          chatID,
          "Invalid file type! pls send .torrent file(s)."
        );
        return;
      }

      //Check if download directory exists if NOT then create it
      if (!fs.existsSync(torrentsDir)) {
        fs.mkdirSync(torrentsDir);
      }

      const torrent_file = await bot.downloadFile(fileId, torrentsDir, {});
      const addTorrent = await client.addTorrent(torrent_file, {});

      if (addTorrent) {
        bot.sendMessage(
          chatID,
          `@${username} your torrent has been added to queue!`,
          options
        );
      }
      fs.unlinkSync(torrent_file);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

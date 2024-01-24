import fs from "fs";
import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";

const addTorrentFile = (bot, sudoUser) => {
  bot.on("document", async (torrent) => {
    const { id: chatID } = torrent.chat;
    const { id: userId, username } = torrent.from;
    const msgId = torrent.message_id;
    const options = { reply_to_message_id: msgId };
    const torrentsDir = "./torrents";
    const { file_id: fileId, fileName } = torrent.document;
    if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
      return;
    }
    try {
      // check for filetypes if not .torrent files then sends user a message
      if (!/\.torrent$/i.test(fileName)) {
        return bot.sendMessage(
          chatID,
          "Invalid .torrent file. Try again!",
          options
        );
      }

      // Check if download directory exists if NOT then create it
      if (!fs.existsSync(torrentsDir)) {
        fs.mkdirSync(torrentsDir);
      }

      const torrentFile = await bot.downloadFile(fileId, torrentsDir, {});
      const addTorrent = await client.addTorrent(torrentFile, {});

      if (addTorrent) {
        bot.sendMessage(
          chatID,
          `@${username} your torrent has been added to queue!`,
          options
        );
      }
      fs.unlinkSync(torrentFile);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

export default addTorrentFile;

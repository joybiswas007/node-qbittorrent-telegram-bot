import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";
import size from "../utils/displaySize.js";

const torrentStatus = (bot, sudoUser) => {
  bot.onText(/\/status/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgId = msg.message_id;
    const userHash = msg.text.replace(match[0], "").trim();
    let message = "";
    const options = {
      parse_mode: "HTML",
      reply_to_message_id: msgId,
    };
    const { id: userId, username } = msg.from;
    if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
      return;
    }
    try {
      if (userHash) {
        const torrentData = await client.getTorrent(userHash);
        const {
          name,
          id,
          state,
          eta,
          dateAdded,
          dateCompleted,
          isCompleted,
          downloadSpeed,
          uploadSpeed,
          totalDownloaded,
          totalUploaded,
          queuePosition,
          connectedSeeds,
          totalPeers,
        } = torrentData;
        const {
          amount_left: amountLeft,
          num_seeds: seeds,
          num_leechs: leechs,
          total_size: totalSize,
          content_path: contentPath,
        } = torrentData.raw;
        message += "<b>Torrent stats: </b>\n";
        message += `Name: ${name}\n`;
        message += `id: <code>${id}</code>\n`;
        message += `State: ${state}\n`;
        message += `ETA: ${eta}\n`;
        message += `Added on: ${dateAdded}\n`;
        message += `Completed on: ${dateCompleted}\n`;
        message += `Completed: ${isCompleted}\n`;
        message += `Download speed: ${size(downloadSpeed)}\n`;
        message += `Upload speed: ${size(uploadSpeed)}\n`;
        message += `Downloaded: ${size(totalDownloaded)}\n`;
        message += `Left amount: ${size(amountLeft)}\n`;
        message += `Uploaded: ${size(totalUploaded)}\n`;
        message += `Queue position: ${queuePosition}\n`;
        message += `Seeders: ${seeds}\n`;
        message += `Leechers: ${leechs}\n`;
        message += `Connected seeds: ${connectedSeeds}\n`;
        message += `Total peers: ${totalPeers}\n`;
        message += `Content Path: ${contentPath}\n`;
        message += `Size: ${size(totalSize)}\n`;
      } else {
        // if user does't give any id then lists all torrents

        const data = await client.getAllData();
        data.torrents.map((torrent) => {
          const { name, id, isCompleted, state: status, eta } = torrent;
          const {
            state,
            total_size: totalSize,
            content_path: contentPath,
          } = torrent.raw;
          message += "<b>Torrents Stats: </b>\n";
          message += `Name: ${name}\n`;
          message += `id: <code>${id}</code>\n`;
          message += `ETA: ${eta}\n`;
          message += `Completed: ${isCompleted}\n`;
          message += `Status: ${status}\n`;
          message += `State: ${state}\n`;
          message += `Content Path: ${contentPath}\n`;
          message += `Size: ${size(totalSize)}\n\n`;
        });
      }
      bot.sendMessage(chatID, message || "No jobs in queue!", options);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

export default torrentStatus;

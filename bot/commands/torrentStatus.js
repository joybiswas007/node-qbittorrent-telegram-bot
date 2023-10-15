import { client, size, sudoChecker } from "../config.js";

export const status = (bot) => {
  bot.onText(/\/status/, async (msg, match) => {
    const chatID = msg.chat.id;
    const msgId = msg.message_id;
    const user_hash = msg.text.replace(match[0], "").trim();
    let message = "";
    const options = {
      parse_mode: "HTML",
      reply_to_message_id: msgId,
    };
    const { id: user_id, username } = msg.from;
    const sudo_user = parseInt(process.env.SUDO_USER);
    if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
      return;
    }
    try {
      if (user_hash) {
        const torrent_data = await client.getTorrent(user_hash);
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
        } = torrent_data;
        const { amount_left, num_seeds, num_leechs, total_size, content_path } =
          torrent_data.raw;
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
        message += `Left amount: ${size(amount_left)}\n`;
        message += `Uploaded: ${size(totalUploaded)}\n`;
        message += `Queue position: ${queuePosition}\n`;
        message += `Seeders: ${num_seeds}\n`;
        message += `Leechers: ${num_leechs}\n`;
        message += `Connected seeds: ${connectedSeeds}\n`;
        message += `Total peers: ${totalPeers}\n`;
        message += `Content Path: ${content_path}\n`;
        message += `Size: ${size(total_size)}\n`;
      } else {
        //if user does't give any id then lists all torrents
        const data = await client.getAllData();
        data.torrents.map((torrent) => {
          const { name, id, isCompleted, state: status, eta } = torrent;
          const { state, total_size, content_path } = torrent.raw;
          message += "<b>Torrents Stats: </b>\n";
          message += `Name: ${name}\n`;
          message += `id: <code>${id}</code>\n`;
          message += `ETA: ${eta}\n`;
          message += `Completed: ${isCompleted}\n`;
          message += `Status: ${status}\n`;
          message += `State: ${state}\n`;
          message += `Content Path: ${content_path}\n`;
          message += `Size: ${size(total_size)}\n\n`;
        });
      }
      bot.sendMessage(chatID, message || "No jobs in queue!", options);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

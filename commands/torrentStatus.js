import { client, torrent_size } from "./config.js";

export const status = (bot) => {
  bot.onText(/\/status/, async (msg, match) => {
    const chatID = msg.chat.id;
    const user_hash = msg.text.replace(match[0], "").trim();
    let message = "";
    const options = {
      parse_mode: "HTML",
    };
    try {
      if (user_hash) {
        const torrent_data = await client.getTorrent(user_hash);
        const { amount_left, num_seeds, num_leechs, total_size } =
          torrent_data.raw;
        message += "<b>Torrent stats: </b>\n";
        message += `Name: ${torrent_data.name}\n`;
        message += `id: ${torrent_data.id}\n`;
        message += `State: ${torrent_data.state}\n`;
        message += `Added on: ${torrent_data.dateAdded}\n`;
        message += `Completed on: ${torrent_data.dateCompleted}\n`;
        message += `Completed: ${torrent_data.isCompleted}\n`;
        message += `Download speed: ${torrent_size(
          torrent_data.downloadSpeed
        )}\n`;
        message += `Upload speed: ${torrent_size(torrent_data.uploadSpeed)}\n`;
        message += `Downloaded: ${torrent_size(
          torrent_data.totalDownloaded
        )}\n`;
        message += `Left amount: ${torrent_size(amount_left)}\n`;
        message += `Uploaded: ${torrent_size(torrent_data.totalUploaded)}\n`;
        message += `Queue position: ${torrent_data.queuePosition}\n`;
        message += `Seeders: ${num_seeds}\n`;
        message += `Leechers: ${num_leechs}\n`;
        message += `Connected seeds: ${torrent_data.connectedSeeds}\n`;
        message += `Total peers: ${torrent_data.totalPeers}\n`;
        message += `Size: ${torrent_size(total_size)}\n`;
      } else {
        //if user does't give any id then lists all torrents
        const data = await client.getAllData();
        data.torrents.map((torrent) => {
          const { state, total_size } = torrent.raw;
          message += "<b>Torrents Stats: </b>\n";
          message += `Name: ${torrent.name}\n`;
          message += `id: <em>${torrent.id}</em>\n`;
          message += `Completed: ${torrent.isCompleted}\n`;
          message += `Status: ${torrent.state}\n`;
          message += `State: ${state}\n`;
          message += `Size: ${torrent_size(total_size)}\n\n`;
        });
      }
      bot.sendMessage(chatID, message || "No jobs in queue!", options);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`);
    }
  });
};

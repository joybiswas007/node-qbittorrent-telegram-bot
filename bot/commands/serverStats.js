import os from "os";
import checkDiskSpace from "check-disk-space";
import client from "../config/qbitConfig.js";
import sudoChecker from "../utils/sudoChecker.js";
import size from "../utils/displaySize.js";
import osUptime from "../utils/displayOSUptime.js";

const serverStats = (bot, sudoUser) => {
  bot.onText(/\/stats/, async (msg) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { parse_mode: "HTML", reply_to_message_id: msgID };
    let message = "";
    const { id: userId, username } = msg.from;
    if (!sudoChecker(userId, username, sudoUser, bot, chatID, options)) {
      return;
    }
    try {
      const hddStorage = await checkDiskSpace(process.env.DISK_PATH);
      message += `Uptime: ${osUptime(os.uptime())}\n`;
      message += `Disk: free ${size(hddStorage.free)} / ${size(
        hddStorage.size
      )}\n`;
      message += `RAM: free ${size(os.freemem())} / ${size(os.totalmem())}\n`;
      const apiInfo = await client.getApiVersion();
      message += `Api v${apiInfo}\n`;

      const appVersion = await client.getAppVersion();
      message += `Client: qBittorrent ${appVersion}\n\n`;

      const buildInfo = await client.getBuildInfo();
      message += "<b>Build info:\n</b>";
      message += `bitness: ${buildInfo.bitness}\n`;
      message += `boost: ${buildInfo.boost}\n`;
      message += `libtorrent: ${buildInfo.libtorrent}\n`;
      message += `openssl: ${buildInfo.openssl}\n`;
      message += `qt: ${buildInfo.qt}\n`;
      message += `zlib: ${buildInfo.zlib}\n`;

      bot.sendMessage(chatID, `<b>Server stats:</b>\n${message}`, options);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

export default serverStats;

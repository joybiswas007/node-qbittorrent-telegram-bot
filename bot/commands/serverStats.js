import { client, osuptime, size, sudoChecker } from "../config.js";
import os from "os";
import checkDiskSpace from "check-disk-space";

export const serverStats = (bot) => {
  bot.onText(/\/stats/, async (msg) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { parse_mode: "HTML", reply_to_message_id: msgID };
    let message = "";
    const { id: user_id, username } = msg.from;
    const sudo_user = parseInt(process.env.SUDO_USER);
    if (!sudoChecker(user_id, username, sudo_user, bot, chatID, options)) {
      return;
    }
    try {
      const hddStorage = await checkDiskSpace(process.env.DISK_PATH);
      message += `Uptime: ${osuptime(os.uptime())}\n`;
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

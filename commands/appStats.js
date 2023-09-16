import { client } from "./config.js";

export const appStats = (bot) => {
  bot.onText(/\/stats/, async (msg) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { parse_mode: "HTML", reply_to_message_id: msgID };
    let message = "";
    try {
      const apiInfo = await client.getApiVersion();
      message += `Api v${apiInfo}\n`;

      const appVersion = await client.getAppVersion();
      message += `qBittorrent ${appVersion}\n\n`;

      const buildInfo = await client.getBuildInfo();
      message += "<b>Build info:\n</b>";
      message += `bitness: ${buildInfo.bitness}\n`;
      message += `boost: ${buildInfo.boost}\n`;
      message += `libtorrent: ${buildInfo.libtorrent}\n`;
      message += `openssl: ${buildInfo.openssl}\n`;
      message += `qt: ${buildInfo.qt}\n`;
      message += `zlib: ${buildInfo.zlib}\n`;

      bot.sendMessage(chatID, `<b>App stats:</b>\n${message}`, options);
    } catch (error) {
      bot.sendMessage(chatID, `${error}`, options);
    }
  });
};

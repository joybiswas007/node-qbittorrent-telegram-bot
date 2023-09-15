import { client } from "./config.js";

export const appInfo = (bot) => {
  bot.onText(/\/info/, (msg) => {
    const chatID = msg.chat.id;
    const msgID = msg.message_id;
    const options = { reply_to_message_id: msgID };
    try {
      const apiInfo = client.getApiVersion();
      apiInfo.then((api) => {
          console.log(api);
      }).catch((err) => {
          console.log(err)
      });
      const appVersion = client.getAppVersion();
      appVersion.then((version) => {
        console.log(version)
      }).catch((err) => {
        console.log(err)
      });
      const buildInfo = client.getBuildInfo();
      buildInfo.then((build) => {
        console.log(build);
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      bot.sendMessage(chatID, `Error: ${error}`, options);
    }
  });
};

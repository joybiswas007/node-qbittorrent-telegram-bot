// Only specified user can run the bot
const sudoChecker = (userId, username, sudoUser, bot, chatID, options) => {
  if (userId !== sudoUser) {
    bot.sendMessage(
      chatID,
      `@${username} you aren't authorized!`,
      options || {}
    );
    return false;
  }

  return true;
};

export default sudoChecker;

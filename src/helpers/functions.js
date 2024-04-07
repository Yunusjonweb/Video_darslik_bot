const users = require("../Model/Users");

module.exports.check_registration = async (user_id) => {
  try {
    const foundUser = await users.findOne({
      user_id,
      isFullyRegistered: true,
    });
    if (foundUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    handleError(error);
  }
};

module.exports.check_subscription = async (bot, context) => {
  console.log(context, 55);
  try {
    const userId = context.chat.id;
    const BotData = {
      channels: ["-1001951018246"],
    };
    bot
      .getChatMember(-1001951018246, userId)
      .then((response) => {
        const status = response.status;
        if (status === "left" || status === "kicked") {
          bot.sendMessage(userId, "❌ Foydalanuvchi kanalga obuna bo'lmagan.");
        } else {
          bot.sendMessage(userId, "✅ Foydalanuvchi kanal a'zosi.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // const BotData = await this.getBotData();
    // const isSubscribedAllChannels = await Promise.all(
    //   BotData?.channels.map(async (channel) => {
    //     try {
    //       const channelInfo = await context.telegram.getChat(channel);
    //       const channelId = channelInfo.id;
    //       const memberInfo = await context.telegram.getChatMember(
    //         channelId,
    //         context.from.id
    //       );
    //       return ["administrator", "member", "creator"].includes(
    //         memberInfo.status
    //       );
    //     } catch (error) {
    //       return true;
    //     }
    //   })
    // );
    // const isSubscribed = isSubscribedAllChannels.includes(false) ? false : true;
    // return BotData.mandatoryChannels ? isSubscribed : true;
  } catch (error) {
    console.log(error + "");
  }
};

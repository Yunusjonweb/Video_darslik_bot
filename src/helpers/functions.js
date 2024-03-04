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

module.exports.check_subscription = async () => {
  try {
    await bot
      .getChatMember(-1001951018246, userId)
      .then(async (response) => {
        const status = response.status;
        if (status === "left" || status === "kicked") {
          return bot.sendMessage(
            userId,
            "❌ Foydalanuvchi kanalga obuna bo'lmagan."
          );
        } else {
          await bot.sendMessage(userId, "✅ Foydalanuvchi kanal a'zosi.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (e) {
    console.log(e + "");
  }
};

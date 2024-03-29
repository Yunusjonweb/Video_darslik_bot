const users = require("../../Model/Users");
const { LangChange } = require("../Texts");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const data = message.data;
    const messageId = message.message.message_id;

    await users.findOneAndUpdate({ user_id: userId }, { lang: data, step: 5 });

    user.lang = data;
    const msg = LangChange(data);

    await Promise.all([
      bot.deleteMessage(userId, messageId),
      bot.sendMessage(userId, msg),
      ]);
  } catch (err) {
    console.log(err.toString());
  }
};

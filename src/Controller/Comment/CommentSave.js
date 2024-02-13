const comments = require("../../Model/Comments");
const users = require("../../Model/Users");
const { CommentSaved } = require("../Texts");

module.exports = async function (bot, message, user) {
  try {
    const { id: userId } = message.from;
    const { text } = message;
    const created_at = new Date();

    await comments.create({
      user_id: userId,
      text,
      created_at,
    });

    await users.findOneAndUpdate({ user_id: userId }, { step: 5 });

    const msg = CommentSaved(user.lang);

    await bot.sendMessage(userId, msg);
  } catch (err) {
    console.log(err.toString());
  }
};

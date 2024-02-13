const usersModel = require("../../Model/Users");
const { CourseList } = require("../Texts");

module.exports = async function (bot, message, user) {
  try {
    const userID = message.from.id;
    const messageId = message.message.message_id;
    const data = message.data;

    await usersModel.findOneAndUpdate(
      {
        user_id: userID,
      },
      {
        courses: data,
        step: 4,
      }
    );

    let msg = CourseList(data);

    await bot.deleteMessage(userID, messageId);
    await bot.sendMessage(userID, msg);
  } catch (err) {
    console.log(err.toString());
  }
};

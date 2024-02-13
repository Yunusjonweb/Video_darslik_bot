const users = require("../../Model/Users");
const { CourseList } = require("../Texts");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const messageId = message.message.message_id;

    let keyboard = {
      inline_keyboard: [],
    };

    let courses = (await CourseList(user.lang)).course;

    for (let course of courses) {
      keyboard.inline_keyboard.push([
        {
          text: course,
          callback_data: course,
        },
      ]);
    }

    await users.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: "course",
      }
    );

    await bot.editMessageReplyMarkup(keyboard, {
      chat_id: userId,
      message_id: messageId,
    });
  } catch (e) {
    console.log(e);
  }
};

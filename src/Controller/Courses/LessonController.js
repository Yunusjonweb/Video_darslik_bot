const categories = require("../../Model/Categories");
const courses = require("../../Model/Courses");
const users = require("../../Model/Users");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const messageText = message.text;

    await users.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: `categoryName#${messageText}`,
      }
    );

    const keyboard = {
      resize_keyboard: true,
      keyboard: [],
    };

    for (let i = 1; i <= 8; i += 3) {
      keyboard.keyboard.push([
        {
          text: i + "-dars",
        },
        {
          text: i + 1 + "-dars",
        },
        {
          text: i + 2 + "-dars",
        },
      ]);
    }

    keyboard.keyboard.push([
      {
        text: "⬅️ Ortga",
      },
      {
        text: "🔝 Davom etish",
      },
    ]);

    await bot.sendMessage(userId, "Mualliflardan birini tanlang 👇", {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err + "");
  }
};

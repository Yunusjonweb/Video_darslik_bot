const categories = require("../../Model/Categories");
const users = require("../../Model/Users");
const LessonController = require("./LessonController");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;

    await users.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: "startOrder",
      }
    );

    const categoryList = await categories.find({});

    let keyboard = {
      resize_keyboard: true,
      keyboard: [],
    };

    for (let i = 0; i < categoryList.length; i++) {
      keyboard.keyboard.push([
        {
          text: categoryList[i].name,
        },
      ]);
    }

    await bot.sendMessage(userId, "Mualliflardan birini tanlang 👇", {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err + "");
  }
};

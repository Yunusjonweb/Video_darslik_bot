const users = require("../../Model/Users");

module.exports = async function (bot, message, user, categoryeData) {
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

    let keyboard = {
      resize_keyboard: true,
      keyboard: [],
    };

    for (let i = 0; i < categoryeData.length; i++) {
      keyboard.keyboard.push([
        {
          text: categoryeData[i].name,
        },
      ]);
    }

    keyboard.keyboard.push([
      {
        text: "⬅️ Ortga",
      },
    ]);

    await bot.sendMessage(userId, "Kurslardan birini tanlang 👇", {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err + "");
  }
};

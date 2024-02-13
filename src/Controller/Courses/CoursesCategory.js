const users = require("../../Model/Users");

module.exports = async function (bot, message, user, categorye1) {
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

    for (let i = 0; i < categorye1.length; i++) {
      keyboard.keyboard.push([
        {
          text: categorye1[i].name,
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

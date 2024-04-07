const users = require("../../Model/Users");

module.exports = async function (bot, message, user, categoryData) {
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

    for (let i = 0; i < categoryData.length; i += 3) {
      const row = categoryData.slice(i, i + 3).map((course) => {
        return {
          text: course.name,
        };
      });

      keyboard.keyboard.push(row);
    }

    keyboard.keyboard.push([
      {
        text: "🔙 Ortga",
      },
    ]);

    await bot.sendMessage(userId, "Kurslardan birini tanlang 👇", {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err + "");
  }
};

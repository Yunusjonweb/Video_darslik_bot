const admins = require("../../../Model/Admins");
const courses = require("../../../Model/Courses");

module.exports = async function (bot, message, admin, productId) {
  try {
    const userId = message.from.id;
    const author = message.text;

    await admins.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: `addProduct#${productId}#des`,
      }
    );

    await courses.findOneAndUpdate(
      {
        id: productId,
      },
      {
        author,
      }
    );

    await bot.sendMessage(userId, "Kurs haqida malumot kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [
            {
              text: "🔙 Ortga",
            },
          ],
        ],
      },
      parse_mode: "HTML",
    });
  } catch (err) {
    console.log(err + "");
  }
};

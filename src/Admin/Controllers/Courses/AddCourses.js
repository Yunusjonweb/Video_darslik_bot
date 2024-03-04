const { v4 } = require("uuid");
const admins = require("../../../Model/Admins");
const courses = require("../../../Model/Courses");

module.exports = async function (bot, message, admin, categoryId) {
  try {
    const userId = message.from.id;

    const product = await courses.create({
      id: v4(),
      category_id: categoryId !== "undefined" ? categoryId : undefined,
    });

    await admins.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: `addProduct#${product.id}#name`,
      }
    );

    await bot.sendMessage(userId, "🛠 Kursni nomini kiriting", {
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
    });
  } catch (err) {
    console.log(err + "");
  }
};

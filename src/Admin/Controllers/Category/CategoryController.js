const admins = require("../../../Model/Admins");
const categories = require("../../../Model/Categories");

module.exports = async function (bot, message, admin, category_id) {
  try {
    const userId = message.from.id;
    let categoryList = [];

    if (category_id) {
      categoryList = await categories.find({ category_id: category_id });
    } else {
      categoryList = await categories.find({
        category_id: { $eq: null },
      });
    }

    let keyboard = {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: "➕ Qo'shish",
          },
        ],
      ],
    };

    for (let i = 0; i < categoryList.length; i += 3) {
      const row = categoryList
        .slice(i, i + 3)
        .map((category) => ({ text: category.name }));
      keyboard.keyboard.push(row);
    }

    keyboard.keyboard.push([
      {
        text: "🔙 Ortga",
      },
    ]);

    if (category_id) {
      keyboard.keyboard[keyboard.keyboard.length - 1].push({
        text: "🗑 O'chirish",
      });
    }

    if (categoryList.length > 0) {
      await bot.sendMessage(
        userId,
        `Quydagi kategoriyalardan birini tanlang!`,
        {
          reply_markup: JSON.stringify(keyboard),
        }
      );
    } else {
      await bot.sendMessage(userId, `Malumot topilmadi`, {
        reply_markup: JSON.stringify(keyboard),
      });
    }
  } catch (error) {
    console.log(error + "");
  }
};

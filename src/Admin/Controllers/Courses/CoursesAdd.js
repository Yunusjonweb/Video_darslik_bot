const categories = require("../../../Model/Categories");

module.exports = async function (bot, message) {
  try {
    const userId = message.from.id;

    let categoryList = [];
    categoryList = await categories.find({ category_id: { $ne: null } });

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
        .map((course) => ({ text: course.name }));
      keyboard.keyboard.push(row);
    }

    keyboard.keyboard.push([
      {
        text: "🔙 Ortga",
      },
    ]);

    await bot.sendMessage(
      userId,
      `Qaysi kategoriyani ichiga kurs qo'shmoqchisiz`,
      {
        reply_markup: keyboard,
      }
    );
  } catch (error) {
    console.log(error + "");
  }
};

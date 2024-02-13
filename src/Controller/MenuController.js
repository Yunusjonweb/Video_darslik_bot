const categories = require("../Model/Categories");
const { MenuMsg } = require("./Texts");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;

    const menuMsg = MenuMsg(user.lang);

    const categoryList = await categories.find({ category_id: null });

    const keyboard = {
      resize_keyboard: true,
      keyboard: [],
    };

    const numRows = Math.ceil(categoryList.length / 2);

    for (let i = 0; i < numRows; i++) {
      const row = [];
      const index1 = i * 2;
      const index2 = index1 + 1;

      if (index1 < categoryList.length) {
        row.push({ text: categoryList[index1].name });
      }

      if (index2 < categoryList.length) {
        row.push({ text: categoryList[index2].name });
      }

      keyboard.keyboard.push(row);
    }

    keyboard.keyboard.push([
      {
        text: menuMsg.keyboard.comment,
      },
      {
        text: menuMsg.keyboard.settings,
      },
    ]);

    keyboard.keyboard.push([
      {
        text: menuMsg.keyboard.statistics,
      },
    ]);

    await bot.sendMessage(userId, menuMsg.text, {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err.toString());
  }
};

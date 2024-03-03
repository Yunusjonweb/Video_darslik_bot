const categories = require("../../../Model/Categories");
const courses = require("../../../Model/Courses");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const data = message.data;
    const messageId = message.message.message_id;

    let type = data.split("#")[0];
    let id = data.split("#")[1];

    if (type != "category") {
      return;
    }

    let categoryList = await categories.find({
      category_id: id,
    });

    let productList = await courses.find({
      category_id: id,
    });

    let items = [...categoryList, ...productList];

    let keyboard = {
      inline_keyboard: [],
    };

    for (let i = 0; i < items.length; i += 2) {
      let newRow = [];
      newRow.push({
        text: items[i].name,
        callback_data: `${items[i].author ? "product" : "category"}#${
          items[i].id
        }`,
      });
      if (items[i + 1]) {
        newRow.push({
          text: items[i + 1].name,
          callback_data: `${items[i].author ? "product" : "category"}#${
            items[i].id
          }`,
        });
      }
      keyboard.inline_keyboard.push(newRow);
    }

    let category = await categories.findOne({
      id,
    });

    let backData = category.category_id
      ? `category#${category.category_id}`
      : `menu`;

    keyboard.inline_keyboard.push([
      {
        text: "⬅️ Ortga",
        callback_data: backData,
      },
    ]);

    await bot.editMessageReplyMarkup(keyboard, {
      chat_id: userId,
      message_id: messageId,
    });
  } catch (err) {
    console.log(err + "");
  }
};

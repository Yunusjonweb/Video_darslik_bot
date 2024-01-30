const categories = require("../../Model/Categories");
const courses = require("../../Model/Courses");
const users = require("../../Model/Users");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const data = message.data;
    const messageId = message.message.message_id;

    const type = data.split("#")[0];
    const id = data.split("#")[1];

    if (type !== "product") {
      return;
    }

    const product = await courses.findOne({
      id,
    });

    await bot.deleteMessage(userId, messageId);

    const productCaption = `💰 Kurs muallifi: <b>${product?.author}</b>\n✍️ Tarkibi: ${product?.description}\n🔄 Miqdorini tanlang`;

    const keyboard = {
      inline_keyboard: [],
    };

    for (let i = 1; i < 8; i += 3) {
      keyboard.inline_keyboard.push([
        {
          text: i,
          callback_data: `count#${product.id}#${i}`,
        },
        {
          text: i + 1,
          callback_data: `count#${product.id}#${i + 1}`,
        },
        {
          text: i + 2,
          callback_data: `count#${product.id}#${i + 2}`,
        },
      ]);
    }

    const category = await categories.findOne({
      id: product.category_id,
    });

    let backData = category.id ? `category#${category.id}` : `menu`;

    keyboard.inline_keyboard.push([
      {
        text: "⬅️ Ortga",
        callback_data: backData,
      },
      {
        text: "🔝 Davom etish",
        callback_data: `menu`,
      },
    ]);

    await users.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: `count#${product.id}`,
      }
    );

    await bot.sendVideo(userId, product.video, {
      parse_mode: "HTML",
      reply_markup: keyboard,
      caption: productCaption,
      disable_notification: true,
    });
  } catch (err) {
    console.log(err + "");
  }
};

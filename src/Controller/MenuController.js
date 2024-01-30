const { MenuMsg } = require("./Texts");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;

    const menuMsg = MenuMsg(user.lang);

    const keyboard = {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: menuMsg.keyboard.literacy,
          },
        ],
        [
          {
            text: menuMsg.keyboard.office,
          },
          {
            text: menuMsg.keyboard.programming,
          },
        ],
        [
          {
            text: menuMsg.keyboard.comment,
          },
          {
            text: menuMsg.keyboard.settings,
          },
        ],
      ],
    };
    await bot.sendMessage(userId, menuMsg.text, {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err.toString());
  }
};

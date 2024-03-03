const categories = require("../../Model/Categories");
const courses = require("../../Model/Courses");
const usersModel = require("../../Model/Users");
const MenuController = require("../MenuController");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const messageText = message.text;

    await usersModel.findOneAndUpdate(
      { user_id: userId },
      { step: `categoryName#${messageText}` }
    );

    const category = await categories.findOne({ name: messageText });

    if (messageText === "⬅️ Ortga") {
      await usersModel.findOneAndUpdate({ user_id: userId }, { step: 5 });

      await MenuController(bot, message, user);
      return;
    }

    const categoryList = await courses.find({ category_id: category.id });

    const keyboard = {
      resize_keyboard: true,
      keyboard: [],
    };

    for (let i = 0; i < categoryList.length; i += 3) {
      const row = categoryList
        .slice(i, i + 3)
        .map((course) => ({ text: course.name }));

      keyboard.keyboard.push(row);
    }

    keyboard.keyboard.push([{ text: "⬅️ Ortga" }]);

    await bot.sendMessage(userId, "Kurslardan birini tanlang 👇", {
      reply_markup: keyboard,
    });
  } catch (err) {
    console.log(err.toString());
  }
};

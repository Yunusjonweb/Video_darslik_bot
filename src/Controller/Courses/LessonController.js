const categoriesModel = require("../../Model/Categories");
const coursesModel = require("../../Model/Courses");
const usersModel = require("../../Model/Users");
const MenuController = require("../MenuController");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const messageText = message.text;

    if (messageText === "🔙 Ortga") {
      await usersModel.findOneAndUpdate(
        {
          user_id: userId,
        },
        {
          step: 5,
        }
      );

      await MenuController(bot, message, user);
      return;
    }

    const categoryNameId = user.step.split("#")[1];
    const category = await categoriesModel.findOne({ name: categoryNameId });

    const coursesList = await coursesModel.find({
      category_id: category.id,
      name: messageText,
    });

    if (coursesList.length === 0) {
      await bot.sendMessage(userId, "❌ Topilmadi");
      return;
    }

    const course = coursesList[0];

    const courseCaption = `📚 Kurs nomi: <b>${course?.name}</b>\n🧑🏻 Kurs muallifi: ${course?.author}\n✍️ Kurs haqida malumot:${course?.description} \n\n 🔊 Ijtimoiy tarmoqlardagi sahifalarimizga obuna bo'lishni  unutmang. \n\n <a href="http://t.me/yunusbeksherlari">Telegram</a> | <a href="https://www.instagram.com/reel/CyZzmYSiV5f/?igshid=MTc4MmM1YmI2Ng==">Instagram </a> | <a href="https://www.youtube.com/channel/UCRtnsijR37YvpvyYIYV6TeA">YouTube </a>`;

    if (course?.video) {
      await bot.sendVideo(userId, course?.video, {
        parse_mode: "HTML",
        caption: courseCaption,
        disable_notification: true,
      });
    } else {
      await bot.sendMessage(userId, "❌ Video topilmadi");
    }
  } catch (err) {
    console.log(err.toString());
  }
};

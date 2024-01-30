const categoriesModel = require("../../Model/Categories");
const coursesModel = require("../../Model/Courses");
const usersModel = require("../../Model/Users");
const MenuController = require("../MenuController");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const messageText = message.text;

    if (messageText === "⬅️ Ortga") {
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
    const categoryList = await categoriesModel.find({});

    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].name === categoryNameId) {
        const coursesList = await coursesModel.find({
          category_id: categoryList[i].id,
        });
        let foundCourse = false;
        for (let j = 0; j < coursesList.length; j++) {
          if (coursesList[j].name === messageText) {
            foundCourse = true;
            const courseCaption = `📚 Kurs nomi: <b>${coursesList[j].name}</b>\n🧑🏻 Kurs muallifi: ${coursesList[j].author}\n✍️ Kurs haqida malumot:${coursesList[j].description}`;
            await bot.sendVideo(userId, coursesList[j].video, {
              parse_mode: "HTML",
              caption: courseCaption,
              disable_notification: true,
            });
          }
        }
        if (!foundCourse) {
          await bot.sendMessage(userId, "Topilmadi");
        }
      }
    }

    const keyboard = {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: "⬅️ Ortga",
          },
          {
            text: "🔝 Davom etish",
          },
        ],
      ],
    };
  } catch (err) {
    console.log(err + "");
  }
};

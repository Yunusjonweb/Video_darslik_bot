const categories = require("../Model/Categories");
const courses = require("../Model/Courses");
const users = require("../Model/Users");
const Keyboard = require("./Courses/Keyboard");
const LessonController = require("./Courses/LessonController");
const LessonController1 = require("./Courses/LessonController1");
const Menu = require("./Courses/Menu");
const MenuController = require("./MenuController");

module.exports = async function (bot, message, user) {
  try {
    const userId = message.from.id;
    const text = message.text;

    if (
      text === "💻 Office darslari" ||
      text === "💻 Office classes" ||
      text === "💻 Классы Office" ||
      user.step === 5 ||
      user.step === 6
    ) {
      await Keyboard(bot, message, user);
    } else if (user.step === "startOrder") {
      await LessonController(bot, message, user);
    } else if (user?.step?.split("#")[0] == "categoryName") {
      await LessonController1(bot, message, user);
    } else if (user?.step?.split("#")[0] == "categoryName") {
      if (text == "⬅️ Ortga" || text == "⬅️ Назад" || text == "⬅️ Back") {
        await users.findOneAndUpdate(
          {
            user_id: userId,
          },
          {
            step: 5,
          }
        );
        await MenuController(bot, message, user);
      } else {
        await LessonController1(bot, message, user);
      }
    }
  } catch (err) {
    console.log(err.toString());
  }
};

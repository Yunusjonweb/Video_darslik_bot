const { v4 } = require("uuid");
const admins = require("../../../Model/Admins");
const courses = require("../../../Model/Courses");
const HomeController = require("../HomeController");

module.exports = async function (bot, message, admin, productId) {
  try {
    const userId = message.from.id;
    await courses.deleteOne({
      id: productId,
    });
    await admins.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: 0,
      }
    );
    await bot.sendMessage(userId, `Kurs qo'shish bekor qilindi`);
    await HomeController(bot, message, admin);
  } catch (err) {
    console.log(err + "");
  }
};

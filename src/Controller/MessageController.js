const categories = require("../Model/Categories");
const LessonKeyboard = require("./Courses/LessonKeyboard");
const CoursesCategory = require("./Courses/CoursesCategory");
const LessonController = require("./Courses/LessonController");
const SettingsController = require("../Controller/Settings/SettingsController");
const CommentController = require("./Comment/CommentController");
const CommentSave = require("./Comment/CommentSave");
const MenuController = require("./MenuController");
const users = require("../Model/Users");
const admins = require("../Model/Admins");
const addPost = require("../Admin/addPost");

module.exports = async function (bot, message, user) {
  const userId = message.from.id;
  const text = message.text;
  const { step } = user;

  if (text == "/post") {
    if (message.reply_to_message) {
      let admin = await admins.findOne({
        user_id: user.user_id,
      });

      if (admin) {
        await addPost(
          bot,
          message.reply_to_message.message_id,
          user.user_id,
          message.reply_to_message.reply_markup
        );
      }
    }
  }

  try {
    if (step === "startOrder") {
      await LessonKeyboard(bot, message, user);
    } else if (step === "comment") {
      if (
        text.includes("⬅️ Ortga") ||
        text.includes("⬅️ Назад") ||
        text.includes("⬅️ Back")
      ) {
        await users.findOneAndUpdate({ user_id: userId }, { step: 4 });
        await MenuController(bot, message, user);
      } else {
        await CommentSave(bot, message, user);
      }
    } else if (step === "phone") {
      if (
        text.includes("⬅️ Ortga") ||
        text.includes("⬅️ Назад") ||
        text.includes("⬅️ Back")
      ) {
        await users.findOneAndUpdate({ user_id: userId }, { step: 4 });
        await MenuController(bot, message, user);
      } else {
        const phoneNumberRegex =
          /^998(90|91|93|94|95|97|98|99|71|55|33|88)\d{7}$/;
        if (phoneNumberRegex.test(parseInt(text))) {
          await users.findOneAndUpdate(
            { user_id: userId },
            { step: 4, phone_number: text }
          );
          await bot.sendMessage(
            userId,
            "✅ Telefon raqamingiz muvaffaqiyatli yangilandi!"
          );
        } else {
          await bot.sendMessage(
            userId,
            "❌ Telefon raqami noto'g'ri formatda. Iltimos, to'g'ri 998xx-xxx-xx-xx formatda kiriting."
          );
        }
      }
    } else if (
      (step == 4 || step == 5) &&
      text.includes("✍️ Taklif yuborish")
    ) {
      await CommentController(bot, message, user);
    } else if ((step == 4 || step == 5) && text.includes("⚙️ Sozlamalar")) {
      const chneufguw = 6525027346;
      await bot.sendMessage(chneufguw, "Salom");
      await SettingsController(bot, message, user);
    } else if ((step == 4 || step == 5) && text.includes("📊 Statistikasi")) {
      const last24Hours = new Date(new Date() - 24 * 60 * 60 * 1000);
      const last30Days = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);

      const count24Hours = await users.countDocuments({
        createdAt: { $gte: last24Hours },
      });
      const count30Days = await users.countDocuments({
        createdAt: { $gte: last30Days },
      });

      const firstRecord = await users.findOne(
        {},
        {},
        { sort: { createdAt: 1 } }
      );
      const totalUsers = await users.countDocuments({});
      const daysSinceStart = Math.floor(
        (new Date() - firstRecord.createdAt) / (1000 * 60 * 60 * 24)
      );

      const message = `👥  Jami obunachilar: ${totalUsers} ta\n\n🆕 Oxirgi 24 soatda: ${count24Hours} ta obunachi qo'shildi\n🆕 Oxirgi 1 oyda: ${count30Days} ta obunachi qo'shildi\n📆 Bot ishga tushganiga: ${daysSinceStart} kun bo'ldi\n\n📊 @dustlikitcenter statistikasi`;

      bot.sendMessage(userId, message);
    } else {
      const categoryList = await categories.find({ category_id: null });

      for (const category of categoryList) {
        if (text === category.name) {
          const categorye1 = await categories.find({
            category_id: category.id,
          });
          await CoursesCategory(bot, message, user, categorye1);
          return;
        }
      }

      const categoryNameStep = step?.split("#")[0];
      if (categoryNameStep === "categoryName") {
        await LessonController(bot, message, user);
        return;
      }
    }
  } catch (err) {
    console.log(err.toString());
  }
};

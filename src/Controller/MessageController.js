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
const StatisticsController = require("./Statistics/StatisticsController");

module.exports = async function (bot, message, user) {
  const userId = message.from.id;
  const text = message.text;
  const { step } = user;
  bot.on("start", (message) => {
    console.log("voy boy nma gap");
  });
  if (text === "/post" && message.reply_to_message) {
    let admin = await admins.findOne({ user_id: user.user_id });

    if (admin) {
      await addPost(
        bot,
        message.reply_to_message.message_id,
        user.user_id,
        message.reply_to_message.reply_markup
      );
    }
  }

  try {
    if (step === "startOrder") {
      await LessonKeyboard(bot, message, user);
    } else if (step === "comment" || step === "phone") {
      if (
        text.includes("🔙 Ortga") ||
        text.includes("🔙 Назад") ||
        text.includes("🔙 Back")
      ) {
        await users.findOneAndUpdate({ user_id: userId }, { step: 4 });
        await MenuController(bot, message, user);
      } else if (step === "comment") {
        await CommentSave(bot, message, user);
      } else if (step === "phone") {
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
      let keyboard = {
        inline_keyboard: [
          [
            {
              text: "✍️ Murojaat yozish",
              url: "https://t.me/yunusbekxabibullayev",
            },
          ],
        ],
      };
      await bot.sendMessage(
        userId,
        `Ushbu bot haqida takliflaringiz va bot ni sotib olish bo'yicha murojaatlar yuborishingiz mumkin.(<i>Masalan: Yunus Xabibullayev</i>)`,
        {
          reply_markup: keyboard,
          parse_mode: "HTML",
        }
      );
      // await CommentController(bot, message, user);
    } else if ((step == 4 || step == 5) && text.includes("⚙️ Sozlamalar")) {
      await SettingsController(bot, message, user);
    } else if ((step == 4 || step == 5) && text.includes("📊 Statistikasi")) {
      await StatisticsController(bot, message, user);
    } else {
      const categoryList = await categories.find();

      for (const category of categoryList) {
        if (text === category.name) {
          const categoryeData = await categories.find({
            category_id: category.id,
          });
          await CoursesCategory(bot, message, user, categoryeData);
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

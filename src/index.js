const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../config");
const SignUp = require("./Controller/SignUp");
const users = require("./Model/Users");
const mongo = require("./Model/mongo");
const MenuController = require("./Controller/MenuController");
const admin = require("./Admin/admin");
const CallbackController = require("./Admin/Controllers/CallbackController");
const MessageController = require("./Controller/MessageController");
const CourseController = require("./Controller/Settings/CourseController");
const PhoneController = require("./Controller/Settings/PhoneController");
const CourseChange = require("./Controller/Settings/CourseChange");
const LangController = require("./Controller/Settings/LangController");
const LangSave = require("./Controller/Settings/LangSave");

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

mongo();

bot.on("message", async (msg) => {
  try {
    const userID = msg.from.id;
    let user = await users.findOne({ user_id: userID });

    if (!user || (user.step && Number(user.step) < 4)) {
      await SignUp(bot, msg, user);
    } else {
      if (user.step == 4) {
        const inlineKeyboard = {
          inline_keyboard: [
            [
              {
                text: "Yunusbek Xabibullayev sherlari",
                url: "https://t.me/yunusbeksherlari",
                callback_data: "channel1",
              },
            ],
            [
              {
                text: "Do'stlik Burger 🍔",
                url: "https://t.me/dustlikburger",
                callback_data: "channel2",
              },
            ],
            [{ text: "✅ Tasdiqlash", callback_data: "check" }],
          ],
        };

        await MenuController(bot, msg, user);
        bot.sendMessage(userID, "Qo'shilishi kerak bo'lgan kanallar:", {
          reply_markup: inlineKeyboard,
        });
      }
      await MessageController(bot, msg, user);
    }
  } catch (e) {
    console.log(e.toString());
  }
});

bot.on("callback_query", async (message) => {
  try {
    const userId = message.from.id;
    const data = message.data;
    let user = await users.findOne({ user_id: userId });

    if (data === "lang") {
      await LangController(bot, message, user);
    } else if (user.step === "lang") {
      await LangSave(bot, message, user);
    } else if (data === "course") {
      await CourseController(bot, message, user);
    } else if (user.step === "course") {
      await CourseChange(bot, message, user);
    } else if (data === "phone") {
      await PhoneController(bot, message, user);
    } else if (data === "menu") {
      await MenuController(bot, message, user);
    } else if (data === "attribution") {
      await AttributionController(bot, message, user);
      // } else if (data === "check") {
      //   await bot
      //     .getChatMember(-1001951018246, userId)
      //     .then(async (response) => {
      //       const status = response.status;
      //       if (status === "left" || status === "kicked") {
      //         return bot.sendMessage(
      //           userId,
      //           "❌ Foydalanuvchi kanalga obuna bo'lmagan."
      //         );
      //       } else {
      //         await users.findOneAndUpdate(
      //           {
      //             user_id: userId,
      //           },
      //           {
      //             step: 5,
      //           }
      //         );
      //         await MessageController(bot, message, user);
      //         await bot.sendMessage(userId, "✅ Foydalanuvchi kanal a'zosi.");
      //       }
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
    }
    await CallbackController(bot, message, user);
  } catch (err) {
    console.log(err.toString());
  }
});

(async () => {
  await admin();
})();

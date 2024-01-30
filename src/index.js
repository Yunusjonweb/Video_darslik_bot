const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../config");
const SignUp = require("./Controller/SignUp");
const users = require("./Model/Users");
const mongo = require("./Model/mongo");
const MenuController = require("./Controller/MenuController");
const admin = require("./Admin/admin");
const CallbackController = require("./Admin/Controllers/CallbackController");
const MessageController = require("./Controller/MessageController");
const courses = require("./Model/Courses");

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

mongo();

bot.on("message", async (msg) => {
  try {
    let userID = msg.from.id;

    let user = await users.findOne({
      user_id: userID,
    });

    if (!user || (Number(user.step) && Number(user.step) < 5)) {
      await SignUp(bot, msg, user);
    } else {
      if (user.step == 5) {
        await users.findOneAndUpdate(
          {
            user_id: userID,
          },
          {
            step: 6,
          }
        );
        await MenuController(bot, msg, user);
      }
      await MessageController(bot, msg, user);
    }
  } catch (e) {
    console.log(e.toString());
  }
});

// bot.on("channel_post", async (message) => {
//   try {
//     const courseId = message?.caption;
//     const videoPath = message?.video?.file_id;

//     await courses.findOneAndUpdate({ id: courseId }, { video: videoPath });
//   } catch (e) {
//     console.log(e + "");
//   }
// });

bot.on("callback_query", async (message) => {
  try {
    const userId = message.from.id;
    const data = message.data;

    let user = await users.findOne({ user_id: userId });

    if (data === "lang") {
      LangController(bot, message, user);
    } else if (user.step === "lang") {
      await LangSave(bot, message, user);
    }

    if (data === "city") {
      await CityController(bot, message, user);
    } else if (user.step === "city") {
      await CityChange(bot, message, user);
    }

    if (data === "phone") {
      await PhoneController(bot, message, user);
    } else if (user.step === "phone_code" && message.text === user.code) {
      await users.findOneAndUpdate({ user_id: userId }, { step: 5 });
      await MenuController(bot, message, user);
    }

    if (data === "menu") {
      await Menu(bot, message, user);
    }

    if (data === "attribution") {
      await AttributionController(bot, message, user);
    }

    await CallbackController(bot, message, user);
  } catch (err) {
    console.log(err + "");
  }
});

(async () => {
  await admin();
})();

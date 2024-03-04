const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../config");
const SignUp = require("./Controller/SignUp");
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
const { check_registration } = require("../src/helpers/functions");
const courses = require("./Model/Courses");
const users = require("./Model/Users");

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

mongo();

bot.on("message", async (msg) => {
  try {
    const userID = msg?.from?.id;
    let user = await users.findOne({ user_id: userID });
    const isRegistered = await check_registration(user?.user_id);

    if (!user || (Number(user.step) && Number(user.step) < 3)) {
      await SignUp(bot, msg, user);
    } else if (!isRegistered) {
      await SignUp(bot, msg, user);
    } else {
      if (user.step > 4) {
        await MenuController(bot, msg, user);
      }
      await MessageController(bot, msg, user);
    }
  } catch (e) {
    console.log(e + "");
  }
});

bot.on("channel_post", async (message) => {
  try {
    const course = await courses.findOneAndUpdate(
      {
        id: message.caption,
      },
      {
        video: message.video.file_id,
      }
    );
  } catch (e) {
    console.log(e + "");
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
    }
    await CallbackController(bot, message, user);
  } catch (err) {
    console.log(err.toString());
  }
});

(async () => {
  await admin();
})();

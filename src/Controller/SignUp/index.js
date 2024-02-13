const users = require("../../Model/Users");
const MenuController = require("../MenuController");
const MessageController = require("../MessageController");
const {
  reqCourses,
  reqPhone,
  reqCode,
  incorrectCode,
  finishReg,
} = require("../Texts");

module.exports = async function (bot, message, user) {
  const userId = message.from.id;
  const text = message.text;
  const phoneText = message.contact
    ? message.contact.phone_number
    : message.text;
  const phoneNumberRegex = /^998(90|91|93|94|95|97|98|99|71|55|33|88)\d{7}$/;
  try {
    if (!user) {
      user = await users.create({
        user_id: userId,
        step: "1",
      });

      await bot.sendMessage(
        userId,
        `🇺🇿 Assalomu alaykum, Men <b>Do'stlik IT center</b> yetkazib berish bot'iman!\n\n🇷🇺 Привет, я бот по доставке <b>Дустлик ИТ-центр</b>!\n\n🇬🇧 Hello, I am a <b>Do'stlik IT center</b> delivery bot!`,
        { parse_mode: "HTML" }
      );

      let langs = {
        resize_keyboard: true,
        keyboard: [
          [
            {
              text: "🇺🇿 O'zbekcha",
            },
          ],
          [
            {
              text: "🇷🇺 Русский",
            },
          ],
          [
            {
              text: "🇬🇧 English",
            },
          ],
        ],
      };

      await bot.sendMessage(
        userId,
        `🇺🇿 Muloqot tilini tanlang\n\n🇷🇺 Выберите язык общения\n\n🇬🇧 Choose a communication language`,
        {
          reply_markup: langs,
        }
      );
    } else if (user.step == "1") {
      if (text == `🇺🇿 O'zbekcha`) {
        user = await users.findOneAndUpdate(
          {
            user_id: userId,
          },
          {
            lang: "uz",
            step: "2",
          }
        );
        let data = reqCourses("uz");
        let keyboard = [];
        for (let i = 0; i < data.courses.length; i += 2) {
          let newRow = [
            {
              text: data.courses[i],
            },
          ];
          if (data.courses[i + 1]) {
            newRow.push({
              text: data.courses[i + 1],
            });
          }
          keyboard.push(newRow);
        }
        await bot.sendMessage(userId, data.text, {
          reply_markup: {
            resize_keyboard: true,
            keyboard,
          },
        });
      } else if (text == `🇷🇺 Русский`) {
        user = await users.findOneAndUpdate(
          {
            user_id: userId,
          },
          {
            lang: "ru",
            step: "2",
          }
        );
        let data = reqCourses("ru");
        let keyboard = [];
        for (let i = 0; i < data.courses.length; i += 2) {
          let newRow = [
            {
              text: data.courses[i],
            },
          ];
          if (data.courses[i + 1]) {
            newRow.push({
              text: data.courses[i + 1],
            });
          }
          keyboard.push(newRow);
        }
        await bot.sendMessage(userId, data.text, {
          reply_markup: {
            resize_keyboard: true,
            keyboard,
          },
        });
      } else if (text == `🇬🇧 English`) {
        user = await users.findOneAndUpdate(
          {
            user_id: userId,
          },
          {
            lang: "eng",
            step: "2",
          }
        );
        let data = reqCourses("eng");
        let keyboard = [];
        for (let i = 0; i < data.courses.length; i += 2) {
          let newRow = [
            {
              text: data.courses[i],
            },
          ];
          if (data.courses[i + 1]) {
            newRow.push({
              text: data.courses[i + 1],
            });
          }
          keyboard.push(newRow);
        }
        await bot.sendMessage(userId, data.text, {
          reply_markup: {
            resize_keyboard: true,
            keyboard,
          },
        });
      }
    } else if (user.step == "2") {
      await users.findOneAndUpdate(
        {
          user_id: userId,
        },
        {
          step: "3",
          courses: text,
        }
      );
      let msg = reqPhone(user.lang);

      await bot.sendMessage(userId, msg, {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [
              {
                text: "Share Contact",
                request_contact: true,
              },
            ],
          ],
        },
        parse_mode: "HTML",
      });
    } else if (user.step == "3") {
      let code = ("" + Math.random()).substring(2, 7);

      if (!phoneNumberRegex.test(parseInt(phoneText))) {
        await bot.sendMessage(
          userId,
          "Telefon raqam son bo'lishi kerak qayta kiriting"
        );
        return;
      }

      await users.findOneAndUpdate(
        {
          user_id: userId,
        },
        {
          step: "4",
          phone_number: phoneText,
        }
      );
      await bot.sendMessage(
        userId,
        finishReg(user.lang, message.from.first_name)
      );
      await MenuController(bot, message, user);
      await MessageController(bot, message, user);
    }
  } catch (err) {
    console.log(err + "");
  }
};

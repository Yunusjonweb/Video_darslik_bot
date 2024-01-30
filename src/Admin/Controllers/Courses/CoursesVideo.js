const admins = require("../../../Model/Admins");
const courses = require("../../../Model/Courses");

module.exports = async function (bot, message, admin, productId) {
  try {
    const userId = message.from.id;
    const channelId = -1002145163406;
    const videoPath = message.video.file_id;

    await admins.findOneAndUpdate(
      {
        user_id: userId,
      },
      {
        step: `addProduct#${productId}#done`,
      }
    );

    await courses.findOneAndUpdate(
      {
        id: productId,
      },
      {
        video: videoPath,
      }
    );

    let course = await courses.findOne({
      id: productId,
    });

    const options = {
      caption: "This is a video caption.",
      duration: 60, // Video duration in seconds
      width: 640, // Video width in pixels
      height: 480, // Video height in pixels
    };

    bot.sendVideo(channelId, videoPath, {
      caption: `${course.id}`,
      parse_mode: "HTML",
    });
    await bot.sendVideo(userId, videoPath, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [
            {
              text: "Saqlash",
            },
            {
              text: "⬅️ Ortga",
            },
          ],
        ],
      },
      caption: `<b>📚 Kurs nomi: </b> ${course.name}\n<b>🧑🏻 Kurs muallifi: </b> ${course.author}\n<b>✍️ Kurs haqida malumot: </b> ${course.description}\n`,
      parse_mode: "HTML",
    });
  } catch (err) {
    console.log(err + "");
  }
};

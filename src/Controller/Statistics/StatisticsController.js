const users = require("../../Model/Users");

module.exports = async function (bot, message, user) {
  const userId = message.from.id;
  try {
    const last24Hours = new Date(new Date() - 24 * 60 * 60 * 1000);
    const last30Days = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);

    const count24Hours = await users.countDocuments({
      createdAt: { $gte: last24Hours },
    });
    const count30Days = await users.countDocuments({
      createdAt: { $gte: last30Days },
    });

    const firstRecord = await users.findOne({}, {}, { sort: { createdAt: 1 } });
    const totalUsers = await users.countDocuments({});
    const daysSinceStart = Math.floor(
      (new Date() - firstRecord.createdAt) / (1000 * 60 * 60 * 24)
    );

    const message = `👥  Jami obunachilar: ${totalUsers} ta\n\n🆕 Oxirgi 24 soatda: ${count24Hours} ta obunachi qo'shildi\n🆕 Oxirgi 1 oyda: ${count30Days} ta obunachi qo'shildi\n📆 Bot ishga tushganiga: ${daysSinceStart} kun bo'ldi\n\n📊 @dustlikitcenter statistikasi`;

    bot.sendMessage(userId, message);
  } catch (err) {
    console.log(err.toString());
  }
};

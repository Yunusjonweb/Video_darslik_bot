const users = require("../Model/Users");

module.exports.check_registration = async (user_id) => {
  try {
    const foundUser = await users.findOne({
      user_id,
      isFullyRegistered: true,
    });
    if (foundUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    handleError(error);
  }
};

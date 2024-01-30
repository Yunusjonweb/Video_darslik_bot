const admins = require("../../Model/Admins");
const categories = require("../Model/");
const AddCategory = require("./Category/AddCategory");
const AddCourses = require("./Courses/AddCourses");
const CategoryController = require("./Category/CategoryController");
const DeleteCourses = require("./Courses/DeleteCourses");
const HomeController = require("./HomeController");
const CoursesAdd = require("./Courses/CoursesAdd");
const CoursesCategory = require("./Courses/CoursesCategory");
const CoursesCategoryBack = require("./Courses/CoursesCategoryBack");
const CoursesVideo = require("./Controllers/Courses/CoursesVideo");
const CoursesSaveController = require("./Courses/CoursesSaveController");
const CoursesUpdateDescription = require("./Courses/CoursesUpdateDescription");
const CoursesUpdateVideo = require("./Courses/CoursesUpdateVideo");
const CoursesUpdateName = require("./Courses/CoursesUpdateName");
const SaveCategory = require("./Category/SaveCategory");
const UsersCount = require("./UsersCount");

module.exports = async function (bot, message, admin) {
  try {
    const userId = message.from.id;
    const text = message.text;

    if (text == "/start" && admin.step == 0) {
      await HomeController(bot, message, admin);
    } else if (admin.step == "0" && text == "➕ Kategoriyalar") {
      await admins.findOneAndUpdate(
        {
          user_id: userId,
        },
        {
          step: `categories#all`,
        }
      );
      await CategoryController(bot, message, admin);
    } else if (admin.step?.split("#")[0] == "categories") {
      if (text == "➕ Qo'shish") {
        let categoryId =
          admin.step?.split("#")[1] == "all"
            ? undefined
            : admin.step?.split("#")[1];

        await AddCategory(bot, message, admin, categoryId);
      } else if (text == "⬅️ Ortga") {
        let stepId = admin.step?.split("#")[1];
        let category = await categories.findOne({
          id: stepId,
        });
        if (stepId == "all") {
          await admins.findOneAndUpdate(
            {
              user_id: userId,
            },
            {
              step: "0",
            }
          );

          await HomeController(bot, message, admin);
          await CategoryController(bot, message, admin, category.id);
          return;
        }
        await admins.findOneAndUpdate(
          {
            user_id: userId,
          },
          {
            step: `categories#${category?.category_id || "all"}`,
          }
        );
        await CategoryController(bot, message, admin, category?.category_id);
      } else if (text == "🗑 O'chirish") {
        let stepId = admin.step.split("#")[1];
        let category = await categories.findOne({
          id: stepId,
        });
        await admins.findOneAndUpdate(
          {
            user_id: userId,
          },
          {
            step: `categories#${category?.category_id || "all"}`,
          }
        );
        await categories.deleteOne({
          id: stepId,
        });
        await categories.deleteMany({
          id: stepId,
        });
        await CategoryController(bot, message, admin, category?.category_id);
      } else {
        let category = await categories.findOne({
          name: text,
        });
        if (category) {
          await admins.findOneAndUpdate(
            {
              user_id: userId,
            },
            {
              step: `categories#${category.id}`,
            }
          );
          await CategoryController(bot, message, admin, category.id);
        }
      }
    } else if (admin.step?.split("#")[0] === "addCategory") {
      let categoryId =
        admin.step?.split("#")[1] === "all"
          ? undefined
          : admin.step?.split("#")[1];
      await SaveCategory(bot, message, admin, categoryId);
    } else if (admin.step == "0" && text == "🛠 Kurslar") {
      await admins.findOneAndUpdate(
        {
          user_id: userId,
        },
        {
          step: `product#categories#all`,
        }
      );
      await CoursesAdd(bot, message, admin);
    } else if (admin.step?.split("#")[0] == "product") {
      if (text == "➕ Qo'shish") {
        let step = admin.step.split("#")[2];
        step = step == "all" ? undefined : step;
        await AddCourses(bot, message, admin, step);
      } else if (text == "⬅️ Ortga") {
        await CoursesCategoryBack(bot, message, admin);
      } else {
        await CoursesCategory(bot, message, admin);
      }
    } else if (admin.step?.split("#")[0] == "addProduct") {
      let productId = admin.step.split("#")[1];
      let step = admin.step.split("#")[2];

      if (text == "⬅️ Ortga") {
        let productId = admin.step.split("#")[1];
        await DeleteCourses(bot, message, admin, productId);
      } else if (step == "name") {
        await CoursesUpdateName(bot, message, admin, productId);
      } else if (step == "author") {
        await CoursesUpdateDescription(bot, message, admin, productId);
      } else if (step == "des") {
        await CoursesUpdateVideo(bot, message, admin, productId);
      } else if (step == "video") {
        await CoursesVideo(bot, message, admin, productId);
      } else if (step == "done" && text == "Saqlash") {
        await CoursesSaveController(bot, message, admin);
      }
    } else if (admin.step == "0" && text == "👤 Foydalanuvchilari sonni") {
      await UsersCount(bot, message, admin);
    }
  } catch (err) {
    console.log(err + "");
  }
};

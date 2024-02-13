const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
  category_id: {
    type: String,
  },
});

const courses = mongoose.model("courses", CoursesSchema);
module.exports = courses;

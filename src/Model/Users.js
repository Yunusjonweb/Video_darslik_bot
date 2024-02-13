const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    unique: true,
  },
  phone_number: {
    type: Number,
  },
  courses: {
    type: String,
  },
  code: {
    type: Number,
  },
  lang: {
    type: String,
  },
  step: {
    type: String,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const users = mongoose.model("users", UserSchema);
module.exports = users;

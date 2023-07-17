const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");

const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: String, required: true },
  signup_date: { type: Date, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Users", usersSchema);

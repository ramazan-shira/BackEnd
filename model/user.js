const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);

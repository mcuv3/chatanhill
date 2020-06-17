const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cel: {
    type: Number,
    required: true,
  },
  profilePhoto: {
    type: String,
  },
  status: {
    type: String,
    default: "I AM BATMAN !!!",
  },
  friends: [
    {
      friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      messages: [{ message: String, date: Date, isMine: Boolean }],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

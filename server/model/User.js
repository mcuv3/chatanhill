const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  cel: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "http://localhost:8080/profilePictures/default.jpeg",
  },
  status: {
    type: String,
    default: "I AM BATMAN !!!",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

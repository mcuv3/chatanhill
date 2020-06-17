const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        text: {
          type: String,
          required: true,
        },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);

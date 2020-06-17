const User = require("../model/User");
const Chat = require("../model/Chat");
const io = require("../socket").io;
const { validationResult } = require("express-validator");
const moment = require("moment");

exports.getChats = async (req, res, next) => {
  const chatsId = req.body.chatsId;

  try {
    const chats = await Chat.find({ _id: { $in: chatsId } }).populate(
      "users",
      "username email cel profilePicture"
    );

    if (!chats) {
      const error = new Error("CHAT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      chats,
    });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.getChat = async (req, res, next) => {
  const chatId = req.body.chatId;

  try {
    const chat = await Chat.findById(chatId).populate("users");
    if (!chat) {
      const error = new Error("CHAT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      chatId: chat._id,
      messages: chat.messages,
      users: chat.users,
    });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.sendMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("ERROR IN VALIDATION");
    error.statusCode = 422;
    error.payload = { errors: errors.array() };
    return next(error);
  }

  const chatId = req.body.chatId;
  const userId = req.userId;
  const message = req.body.message;
  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      const error = new Error("CHAT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
    chat.messages.push({
      text: message,
      date: moment().format("h:mm a"),
      author: userId,
    });
    await chat.save();

    res.status(200).json({
      chat,
    });
    // emit to the users in this chat
    // io().to(chatId.toString()).emit("add message", {
    //   type: "MESSAGE_RECEIVED",
    //   message,
    //   userId,
    // });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.createChat = async (req, res, next) => {
  const participants = req.body.friends; // ['mcuve','chuchito','pepe123'] // including the own user username

  try {
    const users = await User.find({ username: { $in: participants } }).select(
      "_id"
    );
    const chat = new Chat({
      users,
      messages: [],
    });
    const chatCreated = await chat.save();

    users.map(async (user) => {
      const userFetched = await User.findById(user);
      userFetched.chats.push(chatCreated._id);
      await userFetched.save();
    });

    //  io().to(chatCreated._id.toString()).emit();// Emit the chat created to all users in it
    res.status(201).json({
      message: "CHAT CREATED",
      chatCreated,
    });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

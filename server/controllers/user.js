require("dotenv").config();
const User = require("../model/User");
const Chat = require("../model/Chat");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("ERROR IN VALIDATION");
    error.statusCode = 422;
    error.payload = { errors: errors.array() };
    return next(error);
  }

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email }).populate("chats");
    if (!user) {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("INCORRECT PASSWORD");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log(user);
    res.status(200).json({
      token,
      username: user.username,
      userId: user._id,
      expiresIn: 3600,
      chats: user.chats._doc,
    });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("ERROR IN VALIDATION");
    error.statusCode = 422;
    error.payload = { errors: errors.array() };
    return next(error);
  }

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const fullName = req.body.fullName;
  const cel = req.body.cel;
  const profilePicture = req.body.profilePicture;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      username,
      fullName,
      cel,
      profilePicture,
    });
    await user.save();
    res.status(200).json({ message: "USER CREATED", user });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.sendFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const possibleFriend = req.body.username;
  try {
    const user = await User.findOne({ username: possibleFriend });
    if (!user) {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      return next(error);
    }
    user.friendRequest.push({ user: userId });
    await user.save();
    req.status(200).json({
      message: "REQUEST SUCCESSFULLY SENT",
    });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.respondFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const newFriend = req.body.username;
  const option = req.body.option;
  try {
    const user = await User.findById(userId);
    const userFriendId = await User.findOne({ username: newFriend }).select(
      "_id"
    );
    user.friendRequests.filter((u) => u !== userFriendId);

    if (option) {
      const users = [userId, userFriendId];
      const chat = new Chat({
        users: [userId, newFriend],
        messages: [],
      });
      const chatCreated = await chat.save();
      user.chats.push(chatCreated._id);
      userFriendId.chats.push(chatCreated._id);
      await userFriendId.save();
    }
    await user.save();

    //emit both users pushing a new chat between them in theirs sessions
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.editProfile = (req, res, next) => {};

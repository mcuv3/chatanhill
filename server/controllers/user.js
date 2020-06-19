require("dotenv").config();
const User = require("../model/User");
const Chat = require("../model/Chat");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const errorHandling = require("../util/errors");
const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      errorHandling("ERROR IN VALIDATION", 422, { errors: errors.array() })
    );

  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email }).populate(
      "friends",
      "username profilePicture"
    );

    if (!user) return next(errorHandling("USER NOT FOUND", 404));

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual)
      return next(
        errorHandling("INCORRECT PASSWORD", 422, {
          errors: [{ param: "email", msg: "Incorrect email or password" }],
        })
      );

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      username: user.username,
      userId: user._id,
      expiresIn: 3600,
      chats: user.friends,
    });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      errorHandling("ERROR IN VALIDATION", 422, { errors: errors.array() })
    );

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
  const possibleFriend = req.body.friend;
  try {
    const friend = await User.findOne({ username: possibleFriend });

    if (!friend || friend._id.toString() === userId.toString())
      return next(errorHandling("INCORRECT USER", 404));

    const userFriend = await User.findById(userId).select("friends");

    const isAlreadyMyFriend = userFriend.friends.find(
      (f) => f.toString() === friend._id.toString()
    );

    if (isAlreadyMyFriend)
      return next(errorHandling("ITS YOUR FRIEND ALREADY", 404));

    friend.friendRequests.push(userId);
    await friend.save();
    //emit to the friend the request
    res.status(200).json({ message: "REQUEST SUCCESSFULLY SENT" });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

// -h Token Bearer  { friendId,option:Bool (Accept or reject) }
exports.respondFriendRequest = async (req, res, next) => {
  const userId = req.userId;
  const newFriendId = req.body.friendId;
  const option = req.body.option;
  try {
    const user = await User.findById(userId);
    user.friendRequests = user.friendRequests.filter(
      (u) => u.toString() !== newFriendId
    );
    let message = "FRIEND REQUEST REJECTED";

    if (option) {
      const userFriend = await User.findById(newFriendId);
      const users = [userId, userFriend._id];
      const chat = new Chat({
        users,
        messages: [],
      });
      const chatCreated = await chat.save();
      user.chats.push(chatCreated._id);
      user.friends.push(userFriend._id);
      userFriend.chats.push(chatCreated._id);
      userFriend.friends.push(userId);
      await userFriend.save();
      message = "YOU ARE FRIEND RIGHT NOW";
    }
    await user.save();

    res.status(200).json({ message });

    //emit both users pushing a new chat between them in theirs sessions
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  const username = req.params.username;
  try {
    const usernameRegex = new RegExp(username);

    const user = await User.find({
      username: { $regex: usernameRegex, $options: "i" },
    });
    if (!user) return next(errorHandling("USER NOT FOUND", 404));
    res.status(200).json({ user });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};

exports.editProfile = (req, res, next) => {};

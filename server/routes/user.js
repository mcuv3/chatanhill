const router = require("express").Router();
const userControllers = require("../controllers/user");
const isAuth = require("../middleware/is-Auth");
const { check } = require("express-validator");
const User = require("../model/User");

router.post(
  "/login",
  [
    check("email")
      .trim()
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) return Promise.reject("User Not Found");
        });
      }),
    check("password").trim().isLength({ min: 6 }),
  ],
  userControllers.login
);

router.post(
  "/signup",
  [
    check("email", "Enter a valid email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) return Promise.reject("Email already taken");
        });
      }),
    check("password", "Enter a valid password").trim().isLength({ min: 6 }),
    check("cel", "Enter a valid phone number").trim().isMobilePhone(),
    check("fullName", "Thats not your name unless your a Elon Musk'son")
      .trim()
      .isLength({ min: 20 }),
    check("username")
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((user) => {
          if (user) return Promise.reject("Username already taken");
        });
      })
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  userControllers.signup
);

router.put("/edit-profile", isAuth, userControllers.editProfile);

router.post("/friend-request", isAuth, userControllers.sendFriendRequest);

router.put(
  "/respond-friend-request",
  isAuth,
  userControllers.respondFriendRequest
);

router.get("/:username", isAuth, userControllers.getUser);

module.exports = router;

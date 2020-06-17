const router = require("express").Router();
const userControllers = require("../controllers/user");

router.post("/login", userControllers.login);

router.post("/signup", userControllers.signup);

router.put("/edit-profile", userControllers.editProfile);

module.exports = router;

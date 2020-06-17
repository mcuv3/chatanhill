const router = require("express").Router();
const messagesControllers = require("../controllers/messages");

router.get("/", messagesControllers.getMessages);
router.post("/send", messagesControllers.sendMessage);

module.exports = router;

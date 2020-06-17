const router = require("express").Router();
const chatControllers = require("../controllers/chat");

router.get("/many", chatControllers.getChats);

router.get("/single", chatControllers.getChat);

router.post("/send", chatControllers.sendMessage);

router.post("/create-chat", chatControllers.createChat);

module.exports = router;

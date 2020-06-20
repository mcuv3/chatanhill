require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const path = require("path");
const isAuth = require("./middleware/is-Auth");

const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);
app.use("/api/chat", isAuth, chatRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ message, ...error.payload });
  console.log(error);
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = app.listen(8080);
    const io = require("./socket").init(server);
    io.on("connect", (socket) => {
      console.log("CONNECTED TO DE SOCKET");
    });
  })
  .catch((e) => console.log(e));

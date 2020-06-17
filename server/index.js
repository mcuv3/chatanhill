require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/messages");

const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  req.status(status).json({ message, ...error.payload });
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

let socket;
let io;
module.exports = {
  init: (serverHttp) => {
    io = require("socket.io")(serverHttp);
    io.on("connection", (skt) => {
      socket = skt;
      skt.on("JOIN", (chat) => {
        skt.join(chat);
      });
    });
  },
  io: () => {
    if (!socket) throw new Error("SOCKET CANNOT CONNECT");
    return io;
  },
  socket: () => {
    if (!socket) throw new Error("SOCKET CANNOT CONNECT");
    return socket;
  },
};

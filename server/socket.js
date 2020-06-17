let socket;

module.exports = {
  init: (serverHttp) => {
    socket = require("socket.io")(serverHttp);
    return socket;
  },
  io: () => {
    if (!socket) throw new Error("SOCKET CANNOT CONNECT");
    return socket;
  },
};

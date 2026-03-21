module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chatMessage", (msg) => {
      io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

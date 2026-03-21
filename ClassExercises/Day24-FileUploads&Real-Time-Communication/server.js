const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const uploadRoutes = require("./routes/uploadRoutes");
const chatSocket = require("./socket/chatSocket");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.use("/materials", express.static("uploads"));

app.use("/", uploadRoutes);

chatSocket(io);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
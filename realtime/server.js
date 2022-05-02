const http = require("http");
const express = require("express");
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  methods: ["GET", "POST"],
});

const nsp = io.of("/websockettest");

nsp.on("connection", function (socket) {
  console.log("connected socket!");
  socket.on("send-change", (delta) => {
    console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });
});

server.listen(3000, () => {
  console.log(`Server is up on port ${3000}`);
});

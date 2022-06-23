const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const Document = require("./Document");
const axios = require("axios").default;
async function connectMongo() {
  if (!process.env.ATLAS_PASS) {
    throw new Error("atlas pass not provided");
  }
  try {
    await mongoose.connect(
      `mongodb+srv://memorymap:${process.env.ATLAS_PASS}@memorymap.qouo7.mongodb.net/block?retryWrites=true&w=majority`
    );
    console.log("connected realtime db");
  } catch (err) {
    console.error(err);
  }
}
connectMongo();
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
  socket.on("get-document", async (roomId, documentId) => {
    let editorData = "";
    await findDocument(documentId).then((data) => {
      editorData = data;
      console.log("doc: " + editorData);
    });
    socket.join(roomId);
    //console.log("data from backend " + data);
    console.log(editorData);
    socket.emit("load-document", editorData);
    socket.on("send-change", (delta) => {
      console.log(delta);
      socket.broadcast.to(roomId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      console.log("save doc", data.ops);
      const updateValue = { value: data.ops };
      console.log(documentId);
      const block = await Document.findOneAndUpdate(
        { _id: documentId },
        updateValue,
        {
          new: true,
        }
      );
      console.log(block);
    });
  });
});

server.listen(3000, () => {
  console.log(`Server is up on port ${3000}`);
});

async function findDocument(id) {
  console.log(`http://block-srv:3000/api/block/${id}`);
  try {
    blockData = await Document.findOne({ _id: id });
    console.log(blockData.value[0]);
    return blockData.value;
  } catch (error) {
    console.error(error);
  }
}

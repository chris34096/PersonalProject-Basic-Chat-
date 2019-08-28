const express = require("express");
const http = require("http");

const app = express();
const server = http.Server(app);
const io = require("socket.io")(server);
const users = [];

server.listen(3001, function() {
  console.log("The developpement of server 3001 is running");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/styles/index.css", function(req, res) {
  res.sendFile(__dirname + "/styles/index.css");
});

io.on("connection", function(socket) {
  const name = "";

  socket.on("has connected", function(username) {
    name: username;
    users.push(username);
    io.emit("has connected", { username: username, usersList: users });
  });

  socket.on("disconnect", function() {
    users.splice(users.indexOf(name), 1);
    io.emit("has disconnected", { username: name, usersList, users });
  });

  socket.on("new message", function(data) {
    io.emit("new message", data);
  });
});

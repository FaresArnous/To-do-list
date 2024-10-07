const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public")); //serving static files

app.use(express.urlencoded({ extended: false })); //middleware to exratc incoming data

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "home.html");
  res.sendFile(htmlFilePath);
});
app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});
app.get("/tasks", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "tasks.html");
  res.sendFile(htmlFilePath);
});
app.post("/tasks", function (req, res) {
  const task = req.body;
  const filePath = path.join(__dirname, "data", "task.json");
  const fileData = fs.readFileSync(filePath);
  const storedTasks = JSON.parse(fileData);
  storedTasks.push(task);
  fs.writeFileSync(filePath, JSON.stringify(storedTasks));
  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.listen(9090);

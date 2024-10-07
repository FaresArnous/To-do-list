const express = require("express");
const path = require("path");

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
app.post("/tasks", function (res, req) {
  req.body;
});

app.listen(9090);

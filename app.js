const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //to use ejs templet

app.use(express.static("public")); //serving static files

app.use(express.urlencoded({ extended: false })); //middleware to exratc incoming data form the files

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/tasks", function (req, res) {
  const filePath = path.join(__dirname, "data", "task.json");
  const fileData = fs.readFileSync(filePath);
  const storedTasks = JSON.parse(fileData);

  res.render("tasks", {
    numberOfTasks: storedTasks.length,
    tasks: storedTasks,
  });
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
  res.render("confirm");
});

app.listen(9090);

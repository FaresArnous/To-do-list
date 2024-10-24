const express = require("express");
const path = require("path");
const fs = require("fs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("home");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/tasks", async function (req, res) {
  const [result] = await db.query(
    "SELECT COUNT(*) AS totalTasks FROM tasks.task"
  );
  const numberOfTasks = result[0].totalTasks;

  const [tasks] = await db.query("SELECT * FROM tasks.task");

  res.render("tasks", { tasks: tasks, numberOfTasks: numberOfTasks });

  const formattedTasks = tasks.map((task) => {
    task.dueDate = new Date(task.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return task;
  });

  res.render("tasks", { tasks: formattedTasks });
});

router.post("/tasks", async function (req, res) {
  const { name, description, dueDate } = req.body;
  await db.query(
    "INSERT INTO tasks.task (title, content, date) VALUES (?, ?, ?)",
    [name, description, dueDate]
  );

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.post("/tasks/:id/delete", async function (req, res) {
  const taskId = req.params.id;
  await db.query("DELETE FROM tasks.task WHERE id = ?", [taskId]);
  res.redirect("/tasks");
});

module.exports = router;

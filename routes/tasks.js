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

  const formattedTasks = tasks.map((task) => {
    task.date = new Date(task.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return task;
  });

  res.render("tasks", { tasks: formattedTasks, numberOfTasks: numberOfTasks });
});

router.post("/tasks", async function (req, res) {
  const { name, description, date } = req.body;
  await db.query(
    "INSERT INTO tasks.task (title, content, date) VALUES (?, ?, ?)",
    [name, description, date]
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

router.get("/task/:id/edit", async function (req, res) {
  try {
    const taskId = req.params.id;
    const [tasks] = await db.query("SELECT * FROM tasks.task WHERE id = ?", [
      taskId,
    ]);
    if (tasks.length === 0) {
      return res.status(404).send("Task not found");
    }
    const task = tasks[0];
    task.date = new Date(task.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    res.render("update", { task });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving task");
  }
});

router.post("/task/:id/edit", async function (req, res) {
  try {
    const taskId = req.params.id;
    const { name, description, date } = req.body; // Ensure you get `date` from the form

    // Update your query to match the column names
    await db.query(
      "UPDATE tasks.task SET title = ?, content = ?, date = ? WHERE id = ?",
      [name, description, date, taskId]
    );

    res.redirect("/tasks");
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Error updating task");
  }
});

module.exports = router;

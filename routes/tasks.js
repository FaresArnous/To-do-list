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
  const [tasks] = await db.query("SELECT * FROM tasks.task");
  res.render("tasks", { tasks: tasks });
});

router.post("/tasks", function (req, res) {
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;

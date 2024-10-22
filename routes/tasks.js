const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("home");
});

router.get("/about", function (req, res) {
  res.render("about");
});
router.get("/tasks", function (req, res) {
  const filePath = path.join(__dirname, "data", "task.json");
  const fileData = fs.readFileSync(filePath);
  const storedTasks = JSON.parse(fileData);

  res.render("tasks", {
    numberOfTasks: storedTasks.length,
    tasks: storedTasks,
  });
});
router.post("/tasks", function (req, res) {
  const task = req.body;
  const filePath = path.join(__dirname, "data", "task.json");
  const fileData = fs.readFileSync(filePath);
  const storedTasks = JSON.parse(fileData);
  storedTasks.push(task);
  fs.writeFileSync(filePath, JSON.stringify(storedTasks));
  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;

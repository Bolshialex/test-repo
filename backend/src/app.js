const express = require("express");
const cors = require("cors");
const { getTasks, addTask, deleteTask } = require("./taskModel");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/tasks", (req, res) => {
  res.status(200).json(getTasks());
});

app.post("/api/tasks", (req, res) => {
  try {
    const newTask = addTask(req.body.title);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/tasks/:id", (req, res) => {
  const success = deleteTask(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

module.exports = app;

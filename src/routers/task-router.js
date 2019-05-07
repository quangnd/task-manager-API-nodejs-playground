const Task = require("../models/Task");
const express = require("express");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const newTask = new Task(req.body);

  try {
    const createdTask = await newTask.save();
    res.status(201).send(createdTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ["name", "description", "completed"];
  const isValidUpdate = updateFields.every(field =>
    allowedUpdateFields.includes(field)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    let updatedTask = await Task.findById(req.params.id);
    if (!updatedTask) {
      return res.status(404).send();
    }
    updateFields.forEach(key => (updatedTask[key] = req.body[key]));
    await updatedTask.save();

    res.send(updatedTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    let tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.send(err);
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    let task = await Task.findById({ _id: req.params.id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    let deletedTask = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!deletedTask) {
      return res.status(404).send();
    }
    res.send(deletedTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

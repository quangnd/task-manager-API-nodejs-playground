const Task = require("../models/Task");
const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const newTask = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    const createdTask = await newTask.save();
    res.status(201).send(createdTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedUpdateFields = ["name", "description", "completed"];
  const isValidUpdate = updateFields.every(field =>
    allowedUpdateFields.includes(field)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const updatedTask = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

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

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.send(err);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    let deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!deletedTask) {
      return res.status(404).send();
    }
    res.send(deletedTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

const express = require("express");
const chalk = require("chalk");

require("./db/mongoose-connect");

const app = express();
const taskRouter = require("./routers/task-router");
const userRouter = require("./routers/user-router");

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

module.exports = app

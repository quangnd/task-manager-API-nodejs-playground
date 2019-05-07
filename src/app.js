const express = require("express");
const chalk = require("chalk");

require("./db/mongoose-connect");

const app = express();
const taskRouter = require("./routers/task-router");
const userRouter = require("./routers/user-router");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log(chalk.blue(`Server is up on port ${PORT}`));
});

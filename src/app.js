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

const User = require('./models/User')

const main = async () => {
  const user = await User.findById('5cd23b8f154ac2b70183879f')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

main()

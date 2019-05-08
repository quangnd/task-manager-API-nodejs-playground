const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(chalk.blue(`Connected to MongoDB`));
  })
  .catch(e => {
    console.log(chalk.red(`Can not connect to MongoDB`));
  });



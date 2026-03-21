const figlet = require("figlet");
const chalk = require("chalk");

figlet("Welcome to Node.js", (err, data) => {
  if (err) {
    console.log("Error generating banner:", err);
    return;
  }

  console.log(chalk.red(data));
});
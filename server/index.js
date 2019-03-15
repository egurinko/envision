const app = require("./app");
const PORT = process.env.PORT || 4000;
const chalk = require("chalk");

app.listen(PORT, () => {
  console.log(
    chalk.green.bold("Server listening on port: ") + chalk.cyan.bold(PORT)
  );
});

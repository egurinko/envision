const app = require("./app");
const config = require("../config");
const PORT = process.env.PORT || config.express.port;
const chalk = require("chalk");

app.listen(PORT, () => {
  console.log(
    chalk.green.bold("Server listening on port: ") + chalk.cyan.bold(PORT)
  );
});

const Knex = require("knex");

const knex = Knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@127.0.0.1:5432/boat_race_app`,
  searchPath: "public"
});

module.exports = knex;

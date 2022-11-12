const knex = require("knex");

const database = knex({
  client: "mysql2",
  connection: {
    host: "containers-us-west-105.railway.app",
    port: 7866,
    user: "root",
    password: "e4l7jeA1BUkH7st3AwYh",
    database: "railway",
  },
});

module.exports = database;

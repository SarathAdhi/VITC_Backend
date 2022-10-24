const pg = require("pg");
require("dotenv").config();

const client = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.POSGRESQL_PASSWORD,
  database: "vitc",
});

module.exports = client;

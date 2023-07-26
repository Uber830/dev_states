// connection to the mysql
import { createPool } from "mysql2/promise.js";
import { DB_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } from "../config.js";

// Database configuration
const poll = createPool({
  port: DB_PORT,
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

!poll
  ? console.log("Not found connection")
  : true;

export { poll };
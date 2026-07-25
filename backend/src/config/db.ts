import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bhoomimitra",
  password: "postgres123",
  port: 5432,
});

export default pool;
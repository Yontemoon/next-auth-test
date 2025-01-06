import { Pool } from "pg";

const pool = new Pool({
  host: "localhost", // or 'postgres' / 'host.docker.internal'
  port: 5432,
  user: "user",
  password: "password",
  database: "auth_db",
});

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to the database:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    await pool.end();
  }
})();

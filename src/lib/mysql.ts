import mysql, { PoolOptions } from "mysql2/promise";

let pool: mysql.Pool;

const access: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
    ? parseInt(process.env.MYSQL_PORT, 10)
    : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export function createPool() {
  if (!pool) {
    pool = mysql.createPool(access);
  }
  return pool;
}

import { createPool, Pool, PoolConnection } from "mysql2/promise";
import { ConnectionInfoI } from "../models/database.model";
import logger from "../utils/logger";

const mysqlConnect = async ({
  host,
  port,
  user,
  password,
  database,
}: ConnectionInfoI) => {
  let pool: Pool | null = null;
  let connection: PoolConnection | null = null;
  try {
    pool = createPool({
      host:
        host === "localhost" || host === "127.0.0.1"
          ? "host.docker.internal"
          : host,
      port: port,
      user: user,
      password: password,
      database: database,
      waitForConnections: true,
      connectionLimit: 1, // Maximum number of connections in the pool
      queueLimit: 0, // No limit on queued connection requests
      connectTimeout: 10000, // Connection timeout in milliseconds
    });

    connection = await pool.getConnection();
    //console.log("Connected to MySQL database...");
    logger.info("Connected to MySQL database...");
  } catch (error: any) {
    throw new Error(`Failed to connect to database: ${error?.message}`);
  } finally {
    connection?.release();
    await pool?.end(); // Close all connections in the pool
  }
};

export default mysqlConnect;

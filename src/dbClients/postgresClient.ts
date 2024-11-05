import { Pool, PoolClient } from "pg";
import { ConnectionInfoI } from "../models/database.model";

const postgresConnect = async ({
  host,
  port,
  user,
  password,
  database,
}: ConnectionInfoI) => {
  let client: PoolClient | null = null;
  let pool: Pool | null = null;
  try {
    pool = new Pool({
      host:
        host === "localhost" || host === "127.0.0.1"
          ? "host.docker.internal"
          : host,
      port: port,
      user: user,
      password: password,
      database: database,
      max: 1,
      idleTimeoutMillis: 120000, //maximum time (in milliseconds) that a client can be idle before being closed.(1minute in this case)
      connectionTimeoutMillis: 5000, //the time (in milliseconds) to wait when trying to connect before timing out.(5 secons in this case)
    });

    client = await pool.connect();
  } catch (error: any) {
    throw new Error(`Failed to connect to database: ${error?.message}`);
  } finally {
    client?.release(); //Closes the connection
    await pool?.end(); // Ensure the pool is closed
  }
};

export { postgresConnect };

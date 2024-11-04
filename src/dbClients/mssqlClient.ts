import sql, { ConnectionPool } from "mssql";
import { ConnectionInfoI, MSSqlConfig } from "../models/database.model";

const mssqlConnect = async (configData: ConnectionInfoI) => {
  console.log("Hit mssql");
  let pool: ConnectionPool | null = null;
  try {
    // Create the configuration object
    const config = createConfig(configData);
    console.log(config);
    // Initialize and connect the pool
    pool = new sql.ConnectionPool(config);
    // Opens the connection
    await pool.connect();

    console.log("Connected to SQL Server database with a pool...");

    // Example query
    // const result = await pool.request().query("SELECT * FROM your_table");
    // console.log(result.recordset);
  } catch (error: any) {
    throw new Error(`Failed to connect to database: ${error?.message}`);
  } finally {
    pool?.close();
  }
};

const createConfig = ({
  host,
  port,
  user,
  password,
  database,
}: ConnectionInfoI): MSSqlConfig => {
  const config: MSSqlConfig = {
    server:
      host === "localhost" || host === "127.0.0.1"
        ? "host.docker.internal"
        : host,
    user: user,
    password: password,
    database: database,
    options: {
      encrypt: false,
      trustServerCertificate: false,
    },
    pool: {
      max: 1, // Maximum number of connections to create
      min: 0,
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    },
  };

  // Only add the port if it's provided
  if (port) {
    config.port = port; // Now this is valid since `port` is defined in the interface
  }

  return config;
};

export default mssqlConnect;

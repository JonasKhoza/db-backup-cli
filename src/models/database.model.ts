export interface ConnectionInfoI {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
export interface DBConnectCommandI extends ConnectionInfoI {
  dbType: string;
}

export interface MSSqlConfig {
  server: string;
  user: string;
  password: string;
  database: string;
  port?: number; // Port is optional
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
}

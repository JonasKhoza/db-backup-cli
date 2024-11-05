import { Interface } from "readline";

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

export interface BackupCommandI {
  dbType: string;
  port: number;
  host: string;
  user: string;
  password: string;
  database: string;
  backupType: string; // e.g., full, incremental, differential
  schedule?: string; // e.g., daily, weekly, optional
  storage: string; // e.g., local, s3, gcs, azure
  tables?: string;

  // Local storage options
  localPath?: string; // Local directory path if storage is 'local'

  // AWS S3 storage options
  s3Bucket?: string; // S3 bucket name
  s3AccessKey?: string; // AWS access key
  s3SecretKey?: string; // AWS secret access key
  s3Region?: string; // AWS region

  // Google Cloud Storage options
  gcsBucket?: string; // GCS bucket name
  gcsKeyFile?: string;
  gcsKeyFilePath?: string; // Path to GCS service account key file

  // Azure Blob Storage options
  azureContainer?: string; // Azure container name
  azureConnectionString?: string; // Connection string for Azure Blob Storage
  azureAccountKey?: string;
  azureAccountName?: string;
}

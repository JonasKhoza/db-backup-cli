#!/usr/bin/env node

import { Command } from "commander";
import connectCommand from "./commands/testConnection";
import backupCommand from "./commands/backup";
import restoreCommand from "./commands/restore";

const program = new Command();

program
  .version("1.0.0")
  .description(
    "db-backup: A global command-line tool(CLI) for backing up and restoring databases."
  );

program
  .command("connect")
  .description("Test database connection.")
  .requiredOption(
    "--db-type <type>",
    "Database type (mysql, postgresql, mongodb, mssql)"
  )
  .requiredOption("--host <host>", "Database host")
  .requiredOption("--port <port>", "Database port")
  .requiredOption("--user <user>", "Database username")
  .requiredOption("--password <password>", "Dtabase password")
  .requiredOption("--database <database", "Database name")
  .action(connectCommand);

// Set up the backup command with options
program
  .command("backup")
  .description("Backup a database")
  .requiredOption(
    "--db-type <type>",
    "Type of database (e.g., postgresql, mysql, mongodb, sqlite)"
  )
  .requiredOption("--host <host>", "Database host")
  .requiredOption("--port <port>", "Database port")
  .requiredOption("--user <user>", "Database username")
  .requiredOption("--password <password>", "Database password")
  .requiredOption("--database <database>", "Database name")
  .requiredOption(
    "--storage <type>",
    "Storage type (e.g., local, s3, gcs, azure)"
  )
  .option(
    "--backup-type <type>",
    "Backup type (e.g., full, incremental, differential)"
  )
  .option(
    "-t, --tables <tables>",
    "(Optional) Comma-separated list of tables to backup (e.g., users,orders)"
  )
  .option("--schedule <frequency>", "Backup frequency (e.g., daily, weekly)")

  // Options for Local Storage
  .option(
    "--local-path <path>",
    "Local directory path for storing backup files (required if storage is 'local')"
  )
  // Options for AWS S3 Storage
  .option(
    "--s3-bucket <bucket>",
    "S3 bucket name for storing backup (required if storage is 's3')"
  )
  .option("--s3-access-key <key>", "AWS S3 access key")
  .option("--s3-secret-key <secret>", "AWS S3 secret key")
  .option("--s3-region <region>", "AWS S3 region")
  // Options for Google Cloud Storage
  .option(
    "--gcs-bucket <bucket>",
    "Google Cloud Storage bucket name (required if storage is 'gcs')"
  )
  .option(
    "--gcs-key-file <path>",
    "Path to Google Cloud service account key file"
  )
  // Options for Azure Blob Storage
  .option(
    "--azure-container <container>",
    "Azure Blob Storage container name (required if storage is 'azure')"
  )
  .option("--azure-account-name <name>", "Azure account name")
  .option("--azure-account-key <key>", "Azure account key")
  .action(backupCommand);

// Restore command with selective restore options
program
  .command("restore")
  .description("Restore database from a backup file")
  .requiredOption(
    "--db-type <type>",
    "Database type (mysql, postgresql, mongodb)"
  )
  .requiredOption("--file <path>", "Path to the backup file")
  .requiredOption("--database <name>", "Name of the database to restore into")
  .requiredOption("--host <host>", "Database host", "localhost")
  .requiredOption("--port <port>", "Database port")
  .requiredOption("--user <username>", "Database username")
  .requiredOption("--password <password>", "Database password")
  .option(
    "--tables <names>",
    "Specific tables or collections to restore, comma-separated (e.g., users, orders)"
  )
  .action(restoreCommand);

program.parse(process.argv);

//Don't start writing the documentation until I tell you to

//Write me a documentation

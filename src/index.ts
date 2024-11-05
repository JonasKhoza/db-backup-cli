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
  .requiredOption("--user <user>", "Database username")
  .requiredOption("--password <password>", "Database password")
  .requiredOption(
    "--backup-type",
    "Backup type (e.g., full, incremental, differential"
  )
  .option("--schedule <frequency>", "Backup frequency (e.g., daily, weekly)")
  .option("--compress <type>", "Compression type (e.g., gzip, zip)")
  .option("--storage <type>", "Storage type (e.g., local, s3)")
  .action(backupCommand);

// Restore command with selective restore options
program
  .command("restore")
  .description("Restore database from a backup file")
  .requiredOption(
    "--db-type <type>",
    "Database type (mysql, postgresql, mongodb, sqlite)"
  )
  .requiredOption("--file <path>", "Path to the backup file")
  .option(
    "--tables <names>",
    "Specific tables or collections to restore, comma-separated"
  )
  .action(restoreCommand);

console.log("Yes");

program.parse(process.argv);

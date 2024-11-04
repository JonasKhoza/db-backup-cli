#!/usr/bin/env node
import { Command } from "commander";
import { Console } from "console";
import connectCommand from "./commands/testConnection";

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

console.log("Yes");

program.parse(process.argv);

import { format } from "date-fns";
import os from "os";
import path from "path";

import { BackupCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";

const backupMysqlDB = async (commandOptions: BackupCommandI) => {
  const now = new Date();
  const formattedDate = format(now, "ddMMyyyyHHmmss");

  const tempDir = os.tmpdir();

  //Creating the temp file to store the backup
  const backupFilePath = path.resolve(
    tempDir,
    `${commandOptions.database}_backup_${formattedDate}.sql.gz`
  );

  const ip_for_cont =
    commandOptions.host === "localhost" || commandOptions.host === "127.0.0.1"
      ? "host.docker.internal"
      : commandOptions.host;
  let command: string = "";

  const compressionLevel = 9; // Default 6(balance speed and compression). 9: Slowest compression with highest compression (smallest file size).

  // Constructing the mysqldump command
  command = `mysqldump -u ${commandOptions.user} -p${commandOptions.password} -h ${ip_for_cont} -P ${commandOptions.port}`;

  // Check for specified tables
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    const tables = commandOptions.tables.split(",");
    const tableOptions = tables.map((table) => `${table.trim()}`).join(" ");
    command += ` ${tableOptions}`; // Append specified tables to the command
  }

  // Append the database name to the command
  command += ` ${commandOptions.database}`;

  // Pipe the output to gzip with specified compression level
  command += ` | gzip -${compressionLevel} > ${backupFilePath}`;

  //Execute the command
  return executeCommand(command);
};

export default backupMysqlDB;

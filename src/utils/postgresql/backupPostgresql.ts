import { exec } from "child_process";
import path from "path";
import os from "os";
import { format } from "date-fns";

import { BackupCommandI } from "../../models/database.model";

const backupPostgresDB = async (commandOptions: BackupCommandI) => {
  const now = new Date();
  const formattedDate = format(now, "ddMMyyyyHHmmss");

  console.log("backupPostgresDB", commandOptions);
  const tempDir = os.tmpdir();

  const backupFilePath = path.resolve(
    tempDir,
    `${commandOptions.database}_backup_${formattedDate}.sql`
  );

  const ip_for_cont =
    commandOptions.host === "localhost" || commandOptions.host === "127.0.0.1"
      ? "host.docker.internal"
      : commandOptions.host;
  //Command must in end contain 4threads(-j 4), higher compression(-Z 9), format (-F d) to allow parallel processing
  let command: string = "";

  //Constructing the pg_dump command based on whether there's specified tables or not
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    const tables = commandOptions.tables.split(",");
    console.log("Tables", tables);
    const tableOptions = tables.map((table) => `-t ${table.trim()}`).join(" ");
    console.log("Table options", tableOptions);
    command = `PGPASSWORD=${commandOptions.password} pg_dump -U ${commandOptions.user} -h ${ip_for_cont} -p ${commandOptions.port} -F d -j 4 -Z 9 -f ${backupFilePath} ${tableOptions} ${commandOptions.database}`;
  } else {
    command = `PGPASSWORD=${commandOptions.password} pg_dump -U ${commandOptions.user} -h ${ip_for_cont} -p ${commandOptions.port} -F d -j 4 -Z 9 -f ${backupFilePath} ${commandOptions.database}`;
  }

  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Backup failed: ${stderr}`);
      } else {
        console.log("Backup completed successfully.");
        // Resolve with the path of the backup file
        resolve(backupFilePath);
      }
    });
  });
};

export default backupPostgresDB;

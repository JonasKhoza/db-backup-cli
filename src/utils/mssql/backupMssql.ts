import path from "path";
import { format } from "date-fns";
import os from "os";
import { exec } from "child_process";

import { BackupCommandI } from "../../models/database.model";

const backupMssqlDB = async (commandOptions: BackupCommandI) => {
  const now = new Date();
  const formattedDate = format(now, "ddMMyyyyHHmmss");

  console.log("backupPostgresDB", commandOptions);
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

  //Checking if there were specific tables provided
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    console.log("Backing up specific tables is not implemented yet!");
    console.log("Performing a full backup...");
  }

  // Determine the backup type
  //SQL Server does not directly allow to specify a compression level
  let backupCommand;

  switch (commandOptions.backupType.toLowerCase()) {
    case "full":
      backupCommand = `BACKUP DATABASE [${commandOptions.database}] TO DISK = '${backupFilePath}' WITH COMPRESSION, INIT;`;
      break;
    case "differential":
      backupCommand = `BACKUP DATABASE [${commandOptions.database}] TO DISK = '${backupFilePath}' WITH DIFFERENTIAL, COMPRESSION, INIT;`;
      break;
    case "incremental":
      backupCommand = `BACKUP LOG [${commandOptions.database}] TO DISK = '${backupFilePath}' WITH COMPRESSION, INIT;`;
      break;
    default:
      throw new Error(
        'Unsupported backup type. Use "full", "differential", or "incremental".'
      );
  }

  const providedPort = commandOptions.port ? `,${commandOptions.port}` : "";

  const command = `sqlcmd -S ${ip_for_cont}${providedPort} -U ${commandOptions.user} -P ${commandOptions.password} -Q "${backupCommand}"`;

  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Backup failed: ${stderr}`);
      } else {
        console.log("Backup completed successfully.");
        resolve(backupFilePath); // Resolve with the path of the backup file
      }
    });
  });
};

export default backupMssqlDB;

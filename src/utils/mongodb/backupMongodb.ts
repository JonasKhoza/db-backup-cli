import { exec } from "child_process";
import path from "path";
import os from "os";

import { BackupCommandI } from "../../models/database.model";
import { format } from "date-fns";

const backupMongoDB = (commandOptions: BackupCommandI) => {
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
  //Checking if there were specific collections provided
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    console.log("Backing up specific collections is not implemented yet!");
    console.log("Performing a full backup...");
  }
  //compression level cannot be specified directly within the mongodump command itself.
  const command = `mongodump --uri="mongodb://${commandOptions.user}:${commandOptions.password}@${commandOptions.host}:${commandOptions.port}/${commandOptions.database}" --gzip --out=${backupFilePath}`;

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

export default backupMongoDB;

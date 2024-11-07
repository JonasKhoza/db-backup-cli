import path from "path";
import os from "os";
import { format } from "date-fns";

import { BackupCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";

const backupMongoDB = (commandOptions: BackupCommandI) => {
  const now = new Date();
  const formattedDate = format(now, "ddMMyyyyHHmmss");

  const tempDir = os.tmpdir();

  /// Creating the temp file path for the backup
  const backupFilePath = path.resolve(
    tempDir,
    `${commandOptions.database}_backup_${formattedDate}.gz`
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
  // Constructing the mongodump command
  const command = `mongodump --uri="mongodb://${commandOptions.user}:${commandOptions.password}@${ip_for_cont}:${commandOptions.port}/${commandOptions.database}" --gzip --out=${backupFilePath}`;

  //Execute the command
  return executeCommand(command);
};

export default backupMongoDB;

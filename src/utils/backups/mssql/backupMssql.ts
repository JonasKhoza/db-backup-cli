import path from "path";
import { format } from "date-fns";
import os from "os";

import { BackupCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";

const backupMssqlDB = async (commandOptions: BackupCommandI) => {
  const now = new Date();
  const formattedDate = format(now, "ddMMyyyyHHmmss");

  //Creating the temp file to store the backup
  const tempDir = os.tmpdir();
  const backupFilePath = path.resolve(
    tempDir,
    `${commandOptions.database.trim()}_backup_${formattedDate}.bak`
  );

  const ip_for_cont = commandOptions.host;
  // commandOptions.host === "localhost" || commandOptions.host === "127.0.0.1"
  //   ? "host.docker.internal"
  //   : commandOptions.host;

  //Checking if there were specific tables provided
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    console.log("Backing up specific tables is not implemented yet!");
    console.log("Performing a full backup...");
  }

  /*
  Determine the backup type
  SQL Server does not directly allow to specify a compression level
  Uses a built-in compression
  INIT option specifies that the backup should overwrite any existing backup data on the specified media (in this case, the file at backupFilePath).
  */

  let backupCommand;

  const providedPort = commandOptions.port ? `,${commandOptions.port}` : "";

  if (!backupCommand) {
    backupCommand = `BACKUP DATABASE [${commandOptions.database}] TO DISK = '${backupFilePath}' WITH COMPRESSION, INIT;`;
  }

  const command = `sqlcmd -S ${ip_for_cont}${providedPort} -U ${commandOptions.user} -P ${commandOptions.password} -Q "${backupCommand}"`;

  //Execute the command
  return executeCommand(command);
};

export default backupMssqlDB;

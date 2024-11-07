import { RestoreCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";

const restoreMssqlDB = async (commandOptions: RestoreCommandI) => {
  const ip_for_cont = commandOptions.host;
  // commandOptions.host === "localhost" || commandOptions.host === "127.0.0.1"
  //   ? "host.docker.internal"
  //   : commandOptions.host;

  const providedPort = commandOptions.port ? `,${commandOptions.port}` : "";

  // Define the restore command
  /*
          WITH REPLACE option allows the database to be overwritten if it already exists
          WITH RECOVERY ensures the database is restored and ready for use
  */
  const restoreCommand = `RESTORE DATABASE [${commandOptions.database}] FROM DISK = '${commandOptions.file}' WITH REPLACE, RECOVERY`;

  //Accounting on restoring specific tables
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    const tables = commandOptions.tables.split(",");

    //MSSQL allows you to backup specific tables but not restore specific tables but the whole table.

    console.warn("You are only allowed to restore the whole backup in MSSQL");
    console.log("Restoring the whole backup...");
  }

  // Final SQLCMD command to execute the restore
  const command = `sqlcmd -S ${ip_for_cont}${providedPort} -U ${commandOptions.user} -P ${commandOptions.password} -Q "${restoreCommand}"`;

  //Excute the command
  return executeCommand(command);
};

export default restoreMssqlDB;

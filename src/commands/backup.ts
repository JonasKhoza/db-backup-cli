import backupPostgresDB from "../utils/postgresql/backupPostgresql";
import validateBackupCommandOptions from "../utils/backups/validateBackupCommandOptions";
import { BackupCommandI } from "../models/database.model";
import backupMysqlDB from "../utils/mysql/backupMysql";
import backupMssqlDB from "../utils/mssql/backupMssql";
import backupTypeSwitchUtility from "../utils/backups/backupTypeSwitchUtility";
import backupMongoDB from "../utils/mongodb/backupMongodb";

const backupCommand = (commandOptions: BackupCommandI) => {
  //Validate Backup command data
  validateBackupCommandOptions(commandOptions);
  //Pass options to specific DBMS based on type
  switch (commandOptions.dbType.toLowerCase()) {
    case "postgresql":
      backupPostgresDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          backupTypeSwitchUtility(commandOptions, backupFile);
        })
        .catch((error) => {
          console.error(`Error during backup: ${error}`);
        });
      break;
    case "mysql":
      backupMysqlDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          backupTypeSwitchUtility(commandOptions, backupFile);
        })
        .catch((error) => {
          console.error(`Error during backup: ${error}`);
        });
      break;
    case "mongodb":
      backupMongoDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          backupTypeSwitchUtility(commandOptions, backupFile);
        })
        .catch((error) => {
          console.error(`Error during backup: ${error}`);
        });
      break;
    case "mssql":
      backupMssqlDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          backupTypeSwitchUtility(commandOptions, backupFile);
        })
        .catch((error) => {
          console.error(`Error during backup: ${error}`);
        });
      break;
    default:
      console.log(
        `Database for ${commandOptions.dbType} is not implemented yet.`
      );
  }
};

export default backupCommand;

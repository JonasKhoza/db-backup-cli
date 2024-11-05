import backupPostgresDB from "../utils/postgresql/backupPostgresql";
import validateBackupCommandOptions from "../utils/backups/validateBackupCommandOptions";
import { BackupCommandI } from "../models/database.model";
import saveToLocalStorage from "../storage/localStorage";
import backupMysqlDB from "../utils/mysql/backupMysql";

const backupCommand = (commandOptions: BackupCommandI) => {
  //Validate Backup command data
  validateBackupCommandOptions(commandOptions);
  //Pass options to specific DBMS based on type
  switch (commandOptions.dbType.toLowerCase()) {
    case "postgresql":
      backupPostgresDB(commandOptions)
        .then((backupFile) => {
          switch (String(commandOptions.storage).toLowerCase()) {
            case "local":
              //Store under local storage
              if (
                commandOptions?.localPath &&
                commandOptions?.localPath.length > 0
              ) {
                saveToLocalStorage(backupFile, commandOptions?.localPath);
              } else {
                console.error("Local path is not specified for local storage.");
              }

              break;
            case "s3":
              //Store to AWS s3 storage
              break;
            case "gcs":
              //Store to Google Cloud
              break;
            case "azure":
              //Store to Azure
              break;
            default:
              console.log(
                "Storage type indicated hasd not be implemented yet!"
              );
              break;
          }
        })
        .catch((error) => {
          console.error(`Error during backup: ${error}`);
        });
      break;
    case "mysql":
      backupMysqlDB(commandOptions)
        .then((backupFile) => {
          switch (String(commandOptions.storage).toLowerCase()) {
            case "local":
              //Store under local storage
              if (
                commandOptions?.localPath &&
                commandOptions?.localPath.length > 0
              ) {
                saveToLocalStorage(backupFile, commandOptions?.localPath);
              } else {
                console.error("Local path is not specified for local storage.");
              }

              break;
            case "s3":
              //Store to AWS s3 storage
              break;
            case "gcs":
              //Store to Google Cloud
              break;
            case "azure":
              //Store to Azure
              break;
            default:
              console.log(
                "Storage type indicated hasd not be implemented yet!"
              );
              break;
          }
        })
        .catch((error) => {
          console.error(`Error during backup: ${error}`);
        });
      break;
    case "mongodb":
      break;
    case "mssql":
      break;
    default:
      console.log(
        `Database for ${commandOptions.dbType} is not implemented yet.`
      );
  }
};

export default backupCommand;

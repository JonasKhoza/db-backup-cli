import backupPostgresDB from "../utils/backups/postgresql/backupPostgresql";
import validateBackupCommandOptions from "../utils/backups/validateBackupCommandOptions";
import { BackupCommandI } from "../models/database.model";
import backupMysqlDB from "../utils/backups/mysql/backupMysql";
import backupMssqlDB from "../utils/backups/mssql/backupMssql";
import backupTypeSwitchUtility from "../utils/backups/backupTypeSwitchUtility";
import backupMongoDB from "../utils/backups/mongodb/backupMongodb";
import logger from "../utils/logger";
import sendEmail from "../utils/notifier";

const backupCommand = (commandOptions: BackupCommandI) => {
  //Validate Backup command data
  validateBackupCommandOptions(commandOptions);
  //Pass options to specific DBMS based on type
  switch (commandOptions.dbType.toLowerCase()) {
    case "postgresql":
      //Track start time
      logger.info(`Database backup operation started: ${new Date()}`);

      backupPostgresDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          const destinationPath = backupTypeSwitchUtility(
            commandOptions,
            backupFile
          );
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);

          //Send email notification
          sendEmail(
            "Backup completed successfully",
            commandOptions.dbType,
            destinationPath!
          );
        })
        .catch((error) => {
          // console.error(`Error during backup: ${error}`);
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);

          logger.error(`${error}`);

          //Send email notification
          sendEmail(error, "postgresql");
        });

      break;
    case "mysql":
      logger.info(`Database backup operation started: ${new Date()}`);
      backupMysqlDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          const destinationPath = backupTypeSwitchUtility(
            commandOptions,
            backupFile
          );
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);
          //Send email notification
          sendEmail(
            "Backup completed successfully",
            commandOptions.dbType,
            destinationPath!
          );
        })
        .catch((error) => {
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);
          //console.error(`Error during backup: ${error}`);
          logger.error(`${error}`);
          //Send email notification
          sendEmail(error, "mysql");
        });

      break;
    case "mongodb":
      logger.info(`Database backup operation started: ${new Date()}`);
      backupMongoDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          const destinationPath = backupTypeSwitchUtility(
            commandOptions,
            backupFile
          );
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);
          //Send email notification
          sendEmail(
            "Backup completed successfully",
            commandOptions.dbType,
            destinationPath!
          );
        })
        .catch((error) => {
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);
          //console.error(`Error during backup: ${error}`);
          logger.error(`${error}`);
          //Send email notification
          sendEmail(error, "mongodb");
        });

      break;
    case "mssql":
      logger.info(`Database backup operation started: ${new Date()}`);
      backupMssqlDB(commandOptions)
        .then((backupFile) => {
          //Pass to a switch with storage types
          const destinationPath = backupTypeSwitchUtility(
            commandOptions,
            backupFile
          );
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);
          //Send email notification
          sendEmail(
            "Backup completed successfully",
            commandOptions.dbType,
            destinationPath!
          );
        })
        .catch((error) => {
          //Track end time
          logger.info(`Database backup operation ended: ${new Date()}`);
          //console.error(`Error during backup: ${error}`);
          logger.error(`${error}`);
          //Send email notification
          sendEmail(error, "mssql");
        });
      break;

    default:
      // console.log(
      //   `Database for ${commandOptions.dbType} is not implemented yet.`
      // );
      logger.warn(
        `Database for ${commandOptions.dbType} is not implemented yet.`
      );
      //Send email notification
      sendEmail(
        `Database for ${commandOptions.dbType} is not implemented yet.`,
        commandOptions.dbType
      );
  }
};

export default backupCommand;

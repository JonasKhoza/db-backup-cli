import { RestoreCommandI } from "../models/database.model";
import logger from "../utils/logger";
import sendEmail from "../utils/notifier";
import restoreMongodbDB from "../utils/restores/mongodb/restoreMongodbDB";
import restoreMssqlDB from "../utils/restores/mssql/restoreMssql";
import restoreMysqlDB from "../utils/restores/mysql/restoreMysqlDB";
import restorePostresDB from "../utils/restores/postgresql/restorePostgresql";

const restoreCommand = (commandOptions: RestoreCommandI) => {
  //Restore database/tables
  switch (commandOptions.dbType.toLowerCase()) {
    case "postgresql":
      restorePostresDB(commandOptions)
        .then((message) => {
          //console.log(message);
          logger.info(message);
          //Send email notification
          sendEmail(message, "postgresql", commandOptions.database);
        })
        .catch((error) => {
          //console.log(error);
          logger.error(error);
          //Send email notification
          sendEmail(error, "postgresql", commandOptions.database);
        });
      break;
    case "mysql":
      restoreMysqlDB(commandOptions)
        .then((message) => {
          //console.log(message);
          logger.info(message);
          //Send email notification
          sendEmail(message, "mysql", commandOptions.database);
        })
        .catch((error) => {
          //console.log(error);
          logger.error(error);
          //Send email notification
          sendEmail(error, "mysql", commandOptions.database);
        });
      break;
    case "mongodb":
      restoreMongodbDB(commandOptions)
        .then((message) => {
          //console.log(message);
          logger.info(message);
          //Send email notification
          sendEmail(message, "mongodb", commandOptions.database);
        })
        .catch((error) => {
          //console.log(error);
          logger.error(error);
          //Send email notification
          sendEmail(error, "mongodb", commandOptions.database);
        });
      break;
    case "mssql":
      restoreMssqlDB(commandOptions)
        .then((message) => {
          //console.log(message);
          logger.info(message);
          //Send email notification
          sendEmail(message, "mssql", commandOptions.database);
        })
        .catch((error) => {
          //console.log(error);
          logger.error(error);
          //Send email notification
          sendEmail(error, "mssql", commandOptions.database);
        });
      break;
    default:
      // console.log(
      //   `Database for ${commandOptions.dbType} is not implemented yet.`
      // );
      logger.warn(
        `Database for ${commandOptions.dbType} is not implemented yet.`
      );
      process.exit(1);
  }
};

export default restoreCommand;

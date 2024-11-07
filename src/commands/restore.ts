import { RestoreCommandI } from "../models/database.model";
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
          console.log(message);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case "mysql":
      restoreMysqlDB(commandOptions)
        .then((message) => {
          console.log(message);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case "mongodb":
      restoreMongodbDB(commandOptions)
        .then((message) => {
          console.log(message);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case "mssql":
      restoreMssqlDB(commandOptions)
        .then((message) => {
          console.log(message);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
      console.log(
        `Database for ${commandOptions.dbType} is not implemented yet.`
      );
  }
};

export default restoreCommand;

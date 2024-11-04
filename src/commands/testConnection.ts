import { DBConnectCommandI } from "../models/database.model";
import postgresConnect from "../dbClients/postgresClient";
import mysqlConnect from "../dbClients/mysqlClient";
import mongodbConnect from "../dbClients/mongodbClient";
import mssqlConnect from "../dbClients/mssqlClient";

const connectCommand = ({
  dbType,
  port,
  host,
  user,
  password,
  database,
}: DBConnectCommandI) => {
  dbType = String(dbType);
  host = String(host);
  port = Number(port);
  user = String(user);
  password = String(password);
  database = String(database);

  console.log("We're here", {
    dbType,
    port,
    host,
    user,
    password,
    database,
  });

  switch (dbType.toLowerCase()) {
    case "postgresql":
      postgresConnect({ host, port, user, password, database })
        .then(() => {
          console.log("Successfully connected to the postgres database");
        })
        .catch((error) => {
          console.error("Connection failed:", error.message);
        });
      break;
    case "mysql":
      mysqlConnect({ host, port, user, password, database })
        .then(() => {
          console.log("Successfully connected to the mysql database");
        })
        .catch((error) => {
          console.error("Connection failed:", error.message);
        });
      break;
    case "mongodb":
      mongodbConnect({ host, port, user, password, database })
        .then(() => {
          console.log("Successfully connected to the mongodb database");
        })
        .catch((error) => {
          console.error("Connection failed:", error.message);
        });
      break;
    case "mssql":
      mssqlConnect({ host, port, user, password, database })
        .then(() => {
          console.log("Successfully connected to the mssql database");
        })
        .catch((error) => {
          console.error("Connection failed:", error.message);
        });
      break;
    default:
      console.log(`Connection testing for ${dbType} is not implemented yet.`);
  }
};

export default connectCommand;

import { exec } from "child_process";

import { RestoreCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";
import logger from "../../logger";

/*
Because I used mysqldump with .sql format, mysql command-line tool is ideal for restoring such, which is designed for restoring .sql files created by mysqldump
MySQL doesn't directly support restoring specific tables from a full dump, 
but because in the backup feature I used mysqldump command with an option of backing up specific tables, mysql will restore the full dump and not portions(speicic tables) of it
*/

const restoreMysqlDB = (commandOptions: RestoreCommandI) => {
  const ip_for_cont =
    commandOptions.host === "localhost" || commandOptions.host === "127.0.0.1"
      ? "host.docker.internal"
      : commandOptions.host;

  // Constructing the mysql restore command
  //gunzip to decompress the file on the fly.
  let command = `gunzip < ${commandOptions.file} | mysql -u ${commandOptions.user} -p${commandOptions.password} -h ${ip_for_cont} -P ${commandOptions.port} ${commandOptions.database}`;

  // Accounting for restoring specific tables
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    const tables = commandOptions.tables.split(",");
    logger.warn("You are only allowed to restore the whole backup in Mysql");
    //console.warn("You are only allowed to restore the whole backup in Mysql");
    //console.log("Restoring the whole backup...");
    logger.info("Restoring the whole backup...");
  }

  return executeCommand(command);
};

export default restoreMysqlDB;

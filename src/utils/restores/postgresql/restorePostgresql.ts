import { RestoreCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";

/*
Because the format of the backup I used is -F d(directory format), it requires pg_restore while plain backups use psql
pg_restore
    => is designed to work with directory-based backups (created with -F d) as well as tar-based backups (-F t).
    => The command will automatically handle the decompression of each file inside the directory during the restoration process.
*/

const restorePostresDB = (commandOptions: RestoreCommandI) => {
  const ip_for_cont =
    commandOptions.host === "localhost" || commandOptions.host === "127.0.0.1"
      ? "host.docker.internal"
      : commandOptions.host;

  //Creating the command for restoring the whole database or specific tables
  let command = `PGPASSWORD=${commandOptions.password} pg_restore -U ${commandOptions.user} -h ${ip_for_cont} -p ${commandOptions.port} -d ${commandOptions.database} -F d -j 4 ${commandOptions.file}`;
  if (commandOptions?.tables && commandOptions.tables.length > 0) {
    const tables = commandOptions.tables.split(",");
    const tableOptions = tables.map((table) => `-t ${table.trim()}`).join(" ");
    command = `PGPASSWORD=${commandOptions.password} pg_restore -U ${commandOptions.user} -h ${ip_for_cont} -p ${commandOptions.port} -d ${commandOptions.database} -F d -j 4 ${tableOptions} ${commandOptions.file}`;
  }

  //Executing the command
  //Due to -F d option (directory format), pg_restore automaticaly decompress
  return executeCommand(command);
};

export default restorePostresDB;

import { RestoreCommandI } from "../../../models/database.model";
import executeCommand from "../execHelper";

const restoreMongodbDB = (commandOptions: RestoreCommandI) => {
  // Constructing the mongorestore command
  //--drop =>drop the existing collections before restoring, which would replace the existing data.
  const command = `mongorestore --uri="mongodb://${commandOptions.user}:${commandOptions.password}@${commandOptions.host}:${commandOptions.port}/${commandOptions.database}" --drop --gzip --archive=${commandOptions.file}`;

  //Execute the command
  return executeCommand(command);
};

export default restoreMongodbDB;

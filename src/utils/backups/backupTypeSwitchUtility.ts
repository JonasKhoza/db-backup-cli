import { BackupCommandI } from "../../models/database.model";
import saveToLocalStorage from "../../storage/localStorage";

const backupTypeSwitchUtility = (
  commandOptions: BackupCommandI,
  backupFile: string
) => {
  switch (String(commandOptions.storage).toLowerCase()) {
    case "local":
      //Store under local storage
      if (commandOptions?.localPath && commandOptions?.localPath.length > 0) {
        saveToLocalStorage(backupFile, `${commandOptions?.localPath}`);
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
      console.log("Storage type indicated has not be implemented yet!");
      break;
  }
};

export default backupTypeSwitchUtility;

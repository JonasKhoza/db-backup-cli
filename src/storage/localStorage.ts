import fs from "fs";
import path from "path";

const saveToLocalStorage = (backupFile: string, localPath: string) => {
  const fileName = path.basename(backupFile);
  const localFolderFile = path.join(localPath, fileName);
  fs.renameSync(backupFile, localFolderFile);
  console.log(`Successfully saved the file to ${localFolderFile}`);
};

export default saveToLocalStorage;

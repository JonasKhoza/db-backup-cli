import fs from "fs";
import path from "path";

const saveToLocalStorage = (backupPath: string, localPath: string) => {
  const destinationPath = path.join(localPath, path.basename(backupPath));

  if (fs.statSync(backupPath).isDirectory()) {
    // If the backupPath is a directory, recursively copy all its contents
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    fs.readdirSync(backupPath).forEach((file) => {
      const sourcePath = path.join(backupPath, file);
      const targetPath = path.join(destinationPath, file);

      // Recursively copy if it's a directory, otherwise copy the file
      if (fs.statSync(sourcePath).isDirectory()) {
        saveToLocalStorage(sourcePath, destinationPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  } else {
    // If it's a file, just move it to the destination
    fs.copyFileSync(backupPath, destinationPath);
  }

  console.log(`Successfully saved the backup to ${destinationPath}`);
};

export default saveToLocalStorage;

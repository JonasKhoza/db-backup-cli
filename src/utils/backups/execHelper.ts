import { exec } from "child_process";
import logger from "../logger";

const executeCommand = (command: string) => {
  logger.info("Backup started...");
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Backup failed: ${stderr}`);
      } else {
        resolve("Backup completed successfully.");
      }
    });
  });
};

export default executeCommand;

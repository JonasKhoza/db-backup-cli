import { exec } from "child_process";
import logger from "../logger";

const executeCommand = (command: string) => {
  logger.info("Restoring the database...");
  return new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Restore failed: ${stderr}`);
      } else {
        resolve("Restore completed successfully.");
      }
    });
  });
};

export default executeCommand;

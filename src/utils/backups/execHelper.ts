import { exec } from "child_process";

const executeCommand = (command: string) => {
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

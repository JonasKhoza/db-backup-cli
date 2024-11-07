import { exec } from "child_process";

const executeCommand = (command: string) => {
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

import { exec } from "child_process";
import path from "path";
import os from "os";

import { format } from "date-fns";
import { BackupCommandI } from "../../../models/database.model";

/*
  *Compressed using built-in gzip at level 9 (maximum compression).
  *-F d => creates a directory with multiple files (one per table, for example) inside the specified -f directory.
          This is a flexible format because it allows parallel restores.
*/

const backupPostgresDB = async (commandOptions: BackupCommandI) => {
  const now = new Date();
  const formattedDate = format(now, "ddMMyyyyHHmmss");

  const tempDir = os.tmpdir();
  const backupDirPath = path.resolve(
    tempDir,
    `${commandOptions.database.trim()}_backup_${formattedDate}`
  );

  const ip_for_cont = commandOptions.host;
  const platform = os.platform();
  const isWindows = platform === "win32";

  // Build pg_dump command based on whether tables are specified or not
  const tableOptions = commandOptions.tables
    ? commandOptions.tables
        .split(",")
        .map((table) => `-t ${table.trim()}`)
        .join(" ")
    : "";

  const pgDumpCommand = `pg_dump -U ${commandOptions.user} -h ${ip_for_cont} -p ${commandOptions.port} -F d -j 4 -Z 9 -f "${backupDirPath}" ${tableOptions} ${commandOptions.database}`;

  //On Windows, the ComSpec environment variable is used to determine the default command shell, which is usually Command Prompt (cmd.exe), but falls back to PowerShell if configured.
  return new Promise<string>((resolve, reject) => {
    exec(
      pgDumpCommand,
      {
        env: {
          ...process.env,
          PGPASSWORD: commandOptions.password, // Set password in environment
        },
        shell: isWindows ? process.env.ComSpec || "cmd.exe" : "/bin/sh", // Set shell for Windows
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(`Backup failed: ${stderr}`);
        } else {
          console.log("Backup completed successfully.", backupDirPath);
          resolve(backupDirPath);
        }
      }
    );
  });
};

export default backupPostgresDB;

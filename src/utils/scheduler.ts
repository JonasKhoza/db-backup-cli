// import { exec } from "child_process";
//db-backup connect --db-type mssql --port 5432  --host 127.0.0.1 --user sa --password car --database PBKSSTORE --schedule daily --storage locally
// const scheduleBackup = (command) => {};

// import cron from "node-cron";

/*

Daily at midnight: "0 0 * * *"
Weekly on Sundays at midnight: "0 0 * * 0"
Monthly on the first of the month at midnight: "0 0 1 * *"
*/

// const scheduleBackup = (frequency:string) => {
//     cron.schedule(frequency, () => {
//         console.log("Running daily backup...");
//         // Call your backup function here
//       });
// }

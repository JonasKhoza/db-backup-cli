import cron from "node-cron";

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

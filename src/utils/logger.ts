// import winston, { createLogger, transport } from "winston";
// import "winston-daily-rotate-file";
// import fs from "fs";
// import path from "path";

// //Set the environment
// process.env.NODE_ENV === "production";

// const logLevels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

// winston.addColors({
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   http: "magenta",
//   debug: "cyan",
// });

// const logFormat = winston.format.combine(
//   winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//   //winston.format.colorize(), //colorize the levels in the console
//   winston.format.printf(({ timestamp, level, message }) => {
//     return `${timestamp} ${[level.toUpperCase()]}: ${message}`;
//   })
// );

// //Console colorized format
// // const consoleFormat = winston.format.combine(
// //   winston.format.colorize(), //colorize the levels in the console
// //   logFormat
// // );
// const consoleFormat = winston.format.combine(
//   winston.format.colorize({ all: true }), // Apply colorization to the entire log message
//   winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
//   logFormat
// );

// const fileFormat = logFormat; // No colorization for file logs

// //Dynamically create a directory for logs
// //const logsDir = path.join(__dirname, "..", "..", "logs");
// const logsDir = path.resolve(process.cwd(), "logs");
// if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

// const fileTransport = new winston.transports.DailyRotateFile({
//   dirname: logsDir,
//   filename: "app-%DATE%.log",
//   datePattern: "YYYY-MM-DD", // rotated at midnight, based on the datePattern.default date format(YYYY-MM-DD)
//   zippedArchive: true, //Compress old log files (default: false).
//   maxSize: "20m", //If the file exceeds the specified maxSize (e.g., 20MB), the file will be rotated before the day ends.
//   maxFiles: "30d", //Maximum number of files to keep (e.g., 30d for 30 days).
//   format: fileFormat,
// }); //taken from winston daily rotate file

// fileTransport.on("error", (err) => {
//   console.error("File transport error:", err);
// });

// const logger = createLogger({
//   levels: logLevels,
//   level: process.env.NODE_ENV === "production" ? "info" : "debug",
//   //format: fileFormat,
//   transports: [
//     new winston.transports.Console({ format: consoleFormat }), //console the output
//     fileTransport, //file based logging with winston-daily-rotate-file
//   ],
// });

// logger.info("This is an informational message");
// logger.error("This is an error message");

// export default logger;
import winston, { createLogger } from "winston";
import "winston-daily-rotate-file";
import fs from "fs";
import path from "path";

// Set the environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for levels
winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
});

// Define log formats
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }), // Colorize the entire log message
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  logFormat // Clean log format for files
);

// Dynamically create a directory for logs
const logsDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const fileTransport = new winston.transports.DailyRotateFile({
  dirname: logsDir,
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD", // Rotate daily
  zippedArchive: true, // Compress old log files
  maxSize: "20m", // Max file size before rotation, if reached before midnight
  maxFiles: "30d", // Keep logs for 30 days
  format: fileFormat, // Clean format for files
});

// Handle file transport errors
fileTransport.on("error", (err) => {
  console.error("File transport error:", err);
});

// Create the logger
const logger = createLogger({
  levels: logLevels,
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console({ format: consoleFormat }), // Colorized console output
    fileTransport, // Daily rotated file logs
  ],
});

export default logger;

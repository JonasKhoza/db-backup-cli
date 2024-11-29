import winston, { createLogger, transport } from "winston";
import "winston-daily-rotate-file";
import fs from "fs";

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "cyan",
});

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
  winston.format.colorize(), //colorize the levels in the console
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${[level]}: ${message}`;
  })
);

//Dynamically create a directory for logs
fs.mkdirSync();
const fileTransport = new winston.transports.DailyRotateFile({
  dirname,
}); //taken from winston daily rotate file

const logger = createLogger({
  levels: logLevels,
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  transports: [
    new winston.transports.Console(), //console the output
  ],
});

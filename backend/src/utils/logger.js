import * as winston from "winston";
import "winston-daily-rotate-file";
import expressWinston from "express-winston";
import dotenv from 'dotenv';
dotenv.config();

const { combine, timestamp, errors, json, metadata, simple, colorize } = winston.format;


const createDailyRotateTransport = (type) =>
  new winston.transports.DailyRotateFile({
    filename: `logs/${type}/${type}-%DATE%.log`,
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    utc: true,
  });

// Common transports
const combinedTransports = [createDailyRotateTransport("combined")];
const errorTransports = [createDailyRotateTransport("error")];

if (process.env.NODE_ENV === "development") {
  combinedTransports.push(new winston.transports.Console({
    format: combine(colorize(), simple()),
  }));

  errorTransports.push(new winston.transports.Console({
    format: combine(colorize(), simple()),
  }));
}

// Express request logger
export const infoLogger = expressWinston.logger({
  transports: combinedTransports,
  format: combine(timestamp(), json()),
  meta: true,
  expressFormat: true,
  colorize: false,
});

// Raw error logger for internal use
export const errorLogger = winston.createLogger({
  level: "error",
  format: combine(errors({ stack: true }), metadata(), timestamp(), json()),
  transports: errorTransports,
});

// Express error logger middleware
export const expressErrorLogger = expressWinston.errorLogger({
  transports: errorTransports,
  format: combine(errors({ stack: true }), timestamp(), json()),
});

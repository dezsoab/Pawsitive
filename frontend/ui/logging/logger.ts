import winston, { createLogger, format, transports } from "winston";
const { combine, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const isVercel = process.env.VERCEL === "1";

const logger = createLogger({
  level: "info",
  format: combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.simple(),
    winston.format.align(),
    logFormat
  ),
  transports: [
    new transports.Console({ format: combine(colorize(), logFormat) }),
    ...(isVercel
      ? []
      : [
          new transports.File({
            filename: "combined-UI.log",
            dirname: "logs",
            maxsize: 5 * 1024 * 1024, // 5 MB each file
            zippedArchive: true,
            maxFiles: 500,
            tailable: true,
            level: "debug",
          }),
          new transports.File({
            filename: "error-UI.log",
            dirname: "logs",
            maxsize: 5 * 1024 * 1024, // 5 MB each file
            zippedArchive: true,
            maxFiles: 500,
            tailable: true,
            level: "error",
          }),
        ]),
  ],
});

// Add a listener to log errors from Winston itself
logger.on("error", (error) => {
  console.error("Error in Winston logger:", error);
});

export default logger;

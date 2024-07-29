import logger from "@/logging/logger";
import { EventEmitter } from "stream";
import winston from "winston";

jest.mock("winston", () => {
  const originalWinston = jest.requireActual("winston");
  return {
    ...originalWinston,
    createLogger: jest.fn().mockImplementation(() => {
      return {
        log: jest.fn(),
        info: jest.fn(),
        error: jest.fn(),
        on: jest.fn(),
        add: jest.fn()
      };
    }),
    transports: {
      Console: jest.fn(),
      File: jest.fn()
    },
    format: {
      combine: jest.fn(),
      printf: jest.fn(),
      colorize: jest.fn(),
      timestamp: jest.fn(),
      simple: jest.fn(),
      align: jest.fn()
    }
  };
});

class LoggerWithEmitter extends EventEmitter {
  log(level: string, message: string) {
    if (level === 'error') {
      this.emit('error', new Error(message));
    }
  }
}


describe("Logger tests", () => {
  it("should call createLogger with the correct configurations", () => {
    expect(winston.createLogger).toHaveBeenCalled();
    const loggerConfig = (winston.createLogger as jest.Mock).mock.calls[0][0];

    expect(loggerConfig.level).toBe("info");
    expect(loggerConfig.transports.length).toBe(3);
  });

  it("should log info messages", () => {
    const logMessage = "This is an info message";
    logger.info(logMessage);

    expect(logger.info).toHaveBeenCalledWith(logMessage);
  });

  it("should log error messages", () => {
    const logMessage = "This is an error message";
    logger.error(logMessage);

    expect(logger.error).toHaveBeenCalledWith(logMessage);
  });

 it("should handle logger errors", () => {
    const errorHandler = jest.fn();
    const loggerWithEmitter = new LoggerWithEmitter();
    loggerWithEmitter.on("error", errorHandler);
    
    const error = new Error("Test error");
    loggerWithEmitter.log('error', error.message);

    expect(errorHandler).toHaveBeenCalledWith(error);
  });
});
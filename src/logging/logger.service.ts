import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import * as fs from 'fs';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  private logLevel =
    process.env.NODE_ENV === 'production'
      ? ['info', 'error', 'warn']
      : ['info', 'error', 'warn', 'debug', 'verbose'];

  constructor(private readonly cls: ClsService) {
    super();
  }

  private saveLog = (message: string) => {
    const timestamp = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
    fs.appendFile(
      `${process.cwd()}/logs/log_${timestamp}.txt`,
      message,
      (err) => {
        if (err) {
          throw new Error(err.message);
        }
      },
    );
  };

  log(message: any, ...optionalParams: any[]) {
    if (!this.logLevel.includes('info')) {
      return;
    }

    const requestId = this.cls.getId();
    const timestamp = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    const userId = optionalParams.find((obj) => obj.requestingUserId);

    const logMessage = `${timestamp} INFO  mesaj='${message}' idProces='${
      process.pid
    }' requestId='${requestId}' ${
      userId ? `idUser='${userId.requestingUserId}'` : ``
    }`;

    console.log(logMessage);
    this.saveLog(logMessage);
  }

  error(message: any, ...optionalParams: any[]) {
    if (!this.logLevel.includes('error')) {
      return;
    }

    const requestId = this.cls.getId();
    const timestamp = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    const userId = optionalParams.find((obj) => obj.requestingUserId);

    const logMessage = `${timestamp} ERROR mesaj='${message}' idProces='${
      process.pid
    }' idRequest='${requestId}' ${
      userId ? `idUser='${userId.requestingUserId}'` : ``
    }`;

    console.error(logMessage);
    this.saveLog(logMessage);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (!this.logLevel.includes('warn')) {
      return;
    }

    const requestId = this.cls.getId();
    const timestamp = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    const userId = optionalParams.find((obj) => obj.requestingUserId);

    const logMessage = `${timestamp} WARN mesaj='${message}' idProces='${
      process.pid
    }' idRequest='${requestId}' ${
      userId ? `idUser='${userId.requestingUserId}'` : ``
    }`;

    console.warn(logMessage);
    this.saveLog(logMessage);
  }

  debug(message: any, ...optionalParams: any[]) {
    if (!this.logLevel.includes('debug')) {
      return;
    }

    const requestId = this.cls.getId();
    const timestamp = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    const userId = optionalParams.find((obj) => obj.requestingUserId);

    const logMessage = `${timestamp} DEBUG mesaj='${message}' idProces='${
      process.pid
    }' idRequest='${requestId}' ${
      userId ? `idUser='${userId.requestingUserId}'` : ``
    }`;

    console.debug(logMessage);
    this.saveLog(logMessage);
  }
}
